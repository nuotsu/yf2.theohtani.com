import { fetchLeagueScoreboard } from '@/lib/yahoo/fetch'
import Scoreboard from '.'

export default async function ({ league_key }: { league_key: string }) {
	const { scoreboard } = await fetchLeagueScoreboard(league_key)

	return <Scoreboard scoreboard={scoreboard} />
}
