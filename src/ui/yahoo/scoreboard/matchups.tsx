import { flatten, getPluralItems } from '@/lib/yahoo/utils'
import TeamLogo from '@/ui/yahoo/team-logo'
import { cn } from '@/lib/utils'

export default function ({ matchup }: { matchup: Fantasy.Matchup }) {
	const teams = getPluralItems(matchup[0].teams)
	const stat_winners = matchup.stat_winners.map(
		({ stat_winner }) => stat_winner,
	)

	return (
		<>
			{teams.map(({ team: [t0, ...t] }, key) => {
				const [teamInfo, { team_points, team_stats }] = [flatten(t0), ...t]

				return (
					<div
						className={cn(
							'grid min-w-max snap-start scroll-ml-(--column-header-width) grid-rows-subgrid border border-transparent tabular-nums *:px-[.5ch] @max-sm:min-w-[calc((100vw-var(--column-header-width)-.5ch)/2)]',
							key % 2 === 0
								? 'text-right'
								: 'pr-[.5ch] text-left not-last:border-r-current/30',
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
								className={cn('size-lh', key % 2 === 0 ? 'ml-auto' : 'mr-auto')}
								teamInfo={teamInfo}
							/>

							<strong>{team_points.total}</strong>
						</div>

						{team_stats.stats?.map(({ stat }) => {
							const is_winner = stat_winners.find(
								({ stat_id, winner_team_key }) =>
									stat_id === stat.stat_id &&
									winner_team_key === teamInfo.team_key,
							)

							return (
								<div
									className={cn(
										key % 2 === 0 ? 'bg-linear-to-l' : 'bg-linear-to-r',
										is_winner &&
											'bg-green-400/20 text-green-600 dark:text-green-400',
									)}
									data-stat-id={stat.stat_id}
									key={stat.stat_id}
								>
									{stat.value}
								</div>
							)
						})}
					</div>
				)
			})}
		</>
	)
}
