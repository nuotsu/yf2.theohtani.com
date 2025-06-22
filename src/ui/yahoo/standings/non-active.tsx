import { fetchLeagueStandings } from '@/lib/yahoo/fetch'
import Standings from '.'

export default async function ({ league_key }: { league_key: string }) {
	const { standings } = await fetchLeagueStandings(league_key)

	return <Standings standings={standings} />
}
