'use client'

import { fetchFantasyLive } from '@/lib/yahoo/live'
import Scoreboard from '.'
import Loading from '@/ui/loading'

export default function ({
	league_key,
	settings,
}: {
	league_key: string
	settings: Fantasy.LeagueSettings
}) {
	const { data, isLoading } =
		fetchFantasyLive<Fantasy.LeagueScoreboardResponse>(
			`league/${league_key}/scoreboard`,
		)

	if (isLoading || !data) return <Loading>Loading matchups...</Loading>

	return (
		<Scoreboard
			scoreboard={data?.fantasy_content.league[1]}
			settings={settings}
		/>
	)
}
