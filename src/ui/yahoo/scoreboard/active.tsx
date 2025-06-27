'use client'

import { fetchFantasyLive } from '@/lib/yahoo/live'
import Scoreboard from '.'
import Loading from '@/ui/loading'
import { redirect } from 'next/navigation'
import RosterListActive from '@/ui/yahoo/roster/active'

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

	if (isLoading) return <Loading>Loading matchups...</Loading>
	if (!data) return null

	const scoreboard = data.fantasy_content?.league[1]

	if (!scoreboard) redirect('/')

	return (
		<Scoreboard scoreboard={scoreboard} settings={settings}>
			<RosterListActive scoreboard={scoreboard} />
		</Scoreboard>
	)
}
