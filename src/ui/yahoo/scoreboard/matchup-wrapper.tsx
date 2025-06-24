'use client'

import { useMemo } from 'react'
import { useScoreboardContext } from './context'
import { Flatten, flatten, getPluralItems } from '@/lib/yahoo/utils'

export default function ({
	teamInfo,
	style,
	...props
}: { teamInfo: Flatten<Fantasy.TeamInfo> } & React.ComponentProps<'label'>) {
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

				// H/AB
				if (selectedStatCategory === 60) {
					const aH = Number(aStat?.stat.value.split('/')[1])
					const bH = Number(bStat?.stat.value.split('/')[1])
					return bH - aH
				}

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
			style={{ ...style, order }}
			onClick={() => selectedStatCategory && setSelectedStatCategory()}
			{...props}
		/>
	)
}
