'use client'

import { useMemo } from 'react'
import { useScoreboardContext } from './context'
import { flatten, getPluralItems } from '@/lib/yahoo/utils'
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

	const { selectedStatCategory, setSelectedStatCategory, matchups } =
		useScoreboardContext()

	const order = useMemo(() => {
		if (!selectedStatCategory) return undefined

		return matchups
			?.flatMap(({ matchup }) => getPluralItems(matchup[0].teams))
			.sort((a, b) => {
				const aStats = a.team[1].team_stats.stats
				const bStats = b.team[1].team_stats.stats

				const aStat = aStats.find(
					(s) => Number(s.stat.stat_id) === selectedStatCategory,
				)

				const bStat = bStats.find(
					(s) => Number(s.stat.stat_id) === selectedStatCategory,
				)

				// sort by lowest
				if ([26, 27].includes(selectedStatCategory))
					return Number(aStat?.stat.value) - Number(bStat?.stat.value)

				// sort by highest
				return Number(bStat?.stat.value) - Number(aStat?.stat.value)
			})
			.findIndex((t) => flatten(t.team[0]).team_key === teamInfo.team_key)
	}, [selectedStatCategory])

	return (
		<label
			htmlFor="hide-matchups"
			className={cn(
				'grid min-w-max snap-start scroll-ml-(--column-header-width) grid-rows-subgrid border-x border-transparent tabular-nums *:px-[.5ch]',
				index % 2 === 0
					? 'border-l-current/30 pl-[.5ch] text-right'
					: 'text-left',
				'group-has-[:is(#hide-matchups,[name="stat-category"]):checked]:border-none group-has-[:is(#hide-matchups,[name="stat-category"]):checked]:pl-0 group-has-[:is(#hide-matchups,[name="stat-category"]):checked]:text-center',
				is_user_matchup && 'order-first',
			)}
			onClick={() => {
				if (selectedStatCategory && typeof document !== 'undefined') {
					const hideMatchups = document.querySelector(
						'#hide-matchups',
					) as HTMLInputElement

					setSelectedStatCategory()

					if (hideMatchups && !hideMatchups.checked) hideMatchups.checked = true
				}
			}}
			style={{ gridRow: `span ${team_stats.stats.length + 1}`, order }}
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
						'size-lh group-has-[:is(#hide-matchups,[name="stat-category"]):checked]:mx-auto',
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
							[0, '0', '-', '/'].includes(stat.value) && 'text-foreground/50',
							index % 2 === 0 ? 'bg-linear-to-l' : 'bg-linear-to-r',
							is_winner && 'bg-green-400/20 text-green-600 dark:text-green-400',
						)}
						data-stat-id={stat.stat_id}
						key={stat.stat_id}
					>
						{stat.value}
					</div>
				)
			})}
		</label>
	)
}
