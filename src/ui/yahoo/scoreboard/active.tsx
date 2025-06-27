'use client'

import { fetchFantasyLive } from '@/lib/yahoo/live'
import Scoreboard from '.'
import Loading from '@/ui/loading'
import { redirect } from 'next/navigation'

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

	const scoreboard = data?.fantasy_content?.league[1]

	// user gets signed out after a while
	if (!scoreboard) redirect('/')

	return <Scoreboard scoreboard={scoreboard} settings={settings} />
}
