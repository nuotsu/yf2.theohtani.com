'use client'

import { createContext, useContext } from 'react'
import { flatten, getPluralItems } from '@/lib/yahoo/utils'
import { calculateProjections } from '@/lib/yahoo/calculate-projections'

type Props = {
	standings?: {
		team: Fantasy.Team<[Fantasy.TeamStats, Fantasy.TeamStandings]>
	}[]
	scoreboard?: Fantasy.LeagueScoreboard
	matchups?: { matchup: Fantasy.Matchup }[]
	calculateProjections?: typeof calculateProjections
	getProjectedRank?: (team_key: string) => number
}

const StandingsContext = createContext<Props>({})

export function StandingsProvider({
	value,
	children,
}: {
	value: Props
	children: React.ReactNode
}) {
	const { standings, scoreboard } = value

	const matchups = scoreboard
		? getPluralItems(scoreboard.scoreboard[0].matchups)
		: []

	const all_projections = matchups
		.flatMap((m) => getPluralItems(m.matchup[0].teams))
		.map((m) => {
			const team_key = flatten(m.team[0]).team_key
			const team_standings = standings?.find(
				(s) => flatten(s.team[0]).team_key === team_key,
			)?.team[2].team_standings

			return calculateProjections({
				team_key,
				team_standings,
				matchups,
			})
		})
		.sort((a, b) => Number(b?.p_percentage) - Number(a?.p_percentage))

	const leader = all_projections?.[0]

	return (
		<StandingsContext.Provider
			value={{
				matchups,
				calculateProjections: (props) =>
					calculateProjections({
						matchups,
						leader: {
							wins: leader?.p_wins ?? '0',
							losses: leader?.p_losses ?? '0',
						},
						...props,
					}),
				getProjectedRank: (team_key: string) =>
					all_projections.findIndex((p) => p?.team_key === team_key) + 1,
				...value,
			}}
			children={children}
		/>
	)
}

export const useStandingsContext = () => useContext(StandingsContext)
