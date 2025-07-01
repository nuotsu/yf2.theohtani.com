'use client'

import { fetchFantasyLive } from '@/lib/yahoo/live'
import { getPluralItems } from '@/lib/yahoo/utils'
import Loading from '@/ui/loading'
import Standings from '.'

export default function ({ league_key }: { league_key: string }) {
	const { data: standingsData, isLoading: isLoadingStandings } =
		fetchFantasyLive<
			Fantasy.LeagueStandingsResponse<
				[Fantasy.TeamStats, Fantasy.TeamStandings]
			>
		>(`league/${league_key}/standings`)

	const { data: scoreboardData, isLoading: isLoadingScoreboard } =
		fetchFantasyLive<Fantasy.LeagueScoreboardResponse>(
			`league/${league_key}/scoreboard`,
		)

	if (isLoadingStandings || !standingsData?.fantasy_content)
		return <Loading>Loading standings...</Loading>

	if (isLoadingScoreboard || !scoreboardData?.fantasy_content)
		return <Loading>Calculating projections...</Loading>

	return (
		<Standings
			standings={getPluralItems(
				standingsData?.fantasy_content.league[1].standings[0].teams,
			)}
			scoreboard={scoreboardData?.fantasy_content.league[1]}
		/>
	)
}
