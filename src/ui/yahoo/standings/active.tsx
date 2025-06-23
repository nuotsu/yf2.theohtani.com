'use client'

import Standings from '.'
import Loading from '@/ui/loading'
import { fetchFantasyLive } from '@/lib/yahoo/live'
import { getPluralItems } from '@/lib/yahoo/utils'

export default function ({ league_key }: { league_key: string }) {
	const { data, isLoading } = fetchFantasyLive<
		Fantasy.LeagueStandingsResponse<[Fantasy.TeamStats, Fantasy.TeamStandings]>
	>(`league/${league_key}/standings`)

	if (isLoading || !data?.fantasy_content)
		return <Loading>Loading standings...</Loading>

	const standings = getPluralItems(
		data?.fantasy_content.league[1].standings[0].teams,
	)

	return <Standings standings={standings} />
}
