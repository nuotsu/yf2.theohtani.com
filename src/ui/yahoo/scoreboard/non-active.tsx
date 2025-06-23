import { fetchLeagueScoreboard } from '@/lib/yahoo/fetch'
import Scoreboard from '.'

export default async function ({
	league_key,
	settings,
}: {
	league_key: string
	settings: Fantasy.LeagueSettings
}) {
	const { scoreboard } = await fetchLeagueScoreboard(league_key)

	return <Scoreboard scoreboard={scoreboard} settings={settings} />
}
