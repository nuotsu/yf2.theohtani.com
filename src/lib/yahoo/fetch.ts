import { getAccessToken } from './auth'
import { getPluralItems } from './utils'

export async function fetchFantasy<T>(endpoint: string): Promise<T> {
	const accessToken = await getAccessToken()

	const res = await fetch(
		`https://fantasysports.yahooapis.com/fantasy/v2/${endpoint}?format=json`,
		{
			headers: {
				Authorization: `Bearer ${accessToken}`,
			},
		},
	)

	return await res.json()
}

export async function fetchUserLeagues() {
	const data = await fetchFantasy<Fantasy.UserLeaguesResponse>(
		'users;use_login=1/games/leagues',
	)
	const [{ user }] = getPluralItems(data.fantasy_content.users)
	return getPluralItems(user[1].games)
}

export async function fetchLeagueTeams(league_key: string) {
	const data = await fetchFantasy<Fantasy.LeagueTeamsResponse>(
		`league/${league_key}/teams`,
	)
	const [league, { teams }] = data.fantasy_content.league
	return getPluralItems(teams)
}
