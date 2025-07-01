'use client'

import { useScoreboardContext } from './context'
import { sortStats } from '@/lib/yahoo/sort-stats'
import { getPluralItems, type Flatten } from '@/lib/yahoo/utils'
import { cn } from '@/lib/utils'

export default function ({
	stat,
	stat_winners,
	teamInfo,
}: {
	stat: {
		stat_id: string
		value: string
	}
	stat_winners: Fantasy.StatWinner[]
	teamInfo: Flatten<Fantasy.TeamInfo>
}) {
	const { matchups } = useScoreboardContext()

	const is_winner = stat_winners.find(
		(s) =>
			s.stat_winner.stat_id === stat.stat_id &&
			s.stat_winner.winner_team_key === teamInfo.team_key,
	)

	const leader = matchups
		?.flatMap(({ matchup }) => getPluralItems(matchup[0].teams))
		.sort((a, b) => sortStats(a, b, stat.stat_id))[0] ?? { team: [] }

	const leader_stat = leader.team[1]?.team_stats.stats.find(
		(stats) => stats.stat.stat_id === stat.stat_id,
	)?.stat.value
	const is_leader = leader_stat === stat.value

	return (
		<div
			className={cn(
				'px-[.5ch] tabular-nums',
				is_winner && 'bg-green-400/20 text-green-600 dark:text-green-400',
				is_leader && 'text-amber-600 dark:text-amber-400',
				['-', 0, '0', '0.0', '/', '0/0'].includes(stat.value) &&
					'text-foreground/50',
			)}
			data-stat-id={stat.stat_id}
			key={stat.stat_id}
		>
			{stat.value}
		</div>
	)
}
