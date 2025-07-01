import { fetchLeagueScoreboard } from '@/lib/yahoo/fetch'
import { redirect } from 'next/navigation'
import Scoreboard from '.'

export default async function ({
	league_key,
	settings,
	week,
}: {
	league_key: string
	settings: Fantasy.LeagueSettings
	week?: string
}) {
	const { scoreboard } = await fetchLeagueScoreboard(
		league_key,
		week && `week=${week}`,
	)

	if (!scoreboard) redirect('/')

	return <Scoreboard scoreboard={scoreboard} settings={settings} />
}
