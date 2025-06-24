import { flatten } from '@/lib/yahoo/utils'
import MatchupWrapper from './matchup-wrapper'
import TeamLogo from '@/ui/yahoo/team-logo'
import { cn } from '@/lib/utils'

export default function ({
	team,
	is_user_matchup,
	stat_winners,
	index,
}: {
	team: {
		team: Fantasy.Team<[Fantasy.TeamStats]>
	}
	is_user_matchup: boolean
	stat_winners: Fantasy.StatWinner[]
	index: number
}) {
	const [t0, ...t] = team.team
	const [teamInfo, { team_points, team_stats }] = [flatten(t0), ...t]

	return (
		<MatchupWrapper
			teamInfo={teamInfo}
			htmlFor="hide-matchups"
			className={cn(
				'grid min-w-max snap-start scroll-ml-(--column-header-width) grid-rows-subgrid border-x border-transparent tabular-nums *:px-[.5ch]',
				index % 2 === 0
					? 'border-l-current/30 pl-[.5ch] text-right'
					: 'text-left',
				'group-has-[[name="stat-category"]:checked]:border-none group-has-[[name="stat-category"]:checked]:pl-0 group-has-[[name="stat-category"]:checked]:text-center',
				is_user_matchup && 'order-first',
			)}
			style={{ gridRow: `span ${team_stats.stats.length + 1}` }}
			key={teamInfo.team_key}
		>
			<div
				className={cn(
					'pt-[.5ch]',
					teamInfo.is_owned_by_current_login &&
						'dark:bg-foreground/20 bg-foreground/10',
				)}
			>
				<TeamLogo
					className={cn(
						'size-lh group-has-[[name="stat-category"]:checked]:mx-auto',
						index % 2 === 0 ? 'ml-auto' : 'mr-auto',
					)}
					teamInfo={teamInfo}
				/>

				<strong>{team_points.total}</strong>
			</div>

			{team_stats.stats?.map(({ stat }) => {
				const is_winner = stat_winners.find(
					(s) =>
						s.stat_winner.stat_id === stat.stat_id &&
						s.stat_winner.winner_team_key === teamInfo.team_key,
				)

				return (
					<div
						className={cn(
							is_winner && 'bg-green-400/20 text-green-600 dark:text-green-400',
							['-', 0, '0', '0.0', '/', '0/0'].includes(stat.value) &&
								'text-foreground/50',
						)}
						data-stat-id={stat.stat_id}
						key={stat.stat_id}
					>
						{stat.value}
					</div>
				)
			})}
		</MatchupWrapper>
	)
}
