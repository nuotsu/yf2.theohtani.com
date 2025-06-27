'use client'

import { useMemo } from 'react'
import { useScoreboardContext } from './context'
import { flatten, getPluralItems, type Flatten } from '@/lib/yahoo/utils'
import { sortStats } from '@/lib/yahoo/sort-stats'

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
			.sort((a, b) => sortStats(a, b, selectedStatCategory))
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
