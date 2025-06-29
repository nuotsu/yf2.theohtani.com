import { flatten } from '@/lib/yahoo/utils'
import MatchupWrapper from './matchup-wrapper'
import TeamLogo from '@/ui/yahoo/team-logo'
import Stat from './stat'
import Roster from '@/ui/yahoo/roster'
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
				'grid min-w-max snap-start scroll-ml-[calc(var(--column-header-width)+1px)] grid-rows-subgrid border-x border-transparent group-has-[#show-rosters:checked]:w-[7ch] group-has-[#show-rosters:checked]:min-w-[10ch]',
				index % 2 === 0
					? 'border-l-current/30 pl-[.5ch] text-right'
					: 'text-left',
				'group-has-[[name=stat-category]:checked]:border-none group-has-[[name=stat-category]:checked]:pl-0 group-has-[[name=stat-category]:checked]:text-center',
				is_user_matchup && 'order-first',
				teamInfo.is_owned_by_current_login &&
					'ring-foreground/30 group-has-[[name=stat-category]:checked]:ring-1',
			)}
			style={{
				gridRow: `span ${team_stats.stats.length + 3}`,
			}}
			key={teamInfo.team_key}
		>
			<div
				className={cn(
					'p-[.5ch] pb-0',
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

				<strong className="tabular-nums">{team_points.total}</strong>
			</div>

			{team_stats.stats?.map(({ stat }) => (
				<Stat
					stat={stat}
					stat_winners={stat_winners}
					teamInfo={teamInfo}
					key={stat.stat_id}
				/>
			))}

			<Roster team_key={teamInfo.team_key} />
		</MatchupWrapper>
	)
}
