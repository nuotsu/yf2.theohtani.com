import { getAccessToken } from './auth'
import { getPluralItems } from './utils'

export async function fetchFantasy<T>(endpoint: string) {
	const accessToken = await getAccessToken()

	const res = await fetch(
		`https://fantasysports.yahooapis.com/fantasy/v2/${endpoint}?format=json`,
		{
			headers: {
				Authorization: `Bearer ${accessToken}`,
			},
		},
	)

	const data = (await res.json()) as T

	if (!res.ok) {
		return { isError: true }
	} else {
		return { data }
	}
}

export async function fetchUserLeagues() {
	const { data, isError } = await fetchFantasy<Fantasy.UserLeaguesResponse>(
		'users;use_login=1/games/leagues',
	)

	if (isError || !data) {
		return { isError }
	}

	const [{ user }] = getPluralItems(data.fantasy_content.users)
	return { data, userLeagues: getPluralItems(user[1].games) }
}

export async function fetchLeagueTeams<Params = []>(
	league_key: string,
	params?: string,
) {
	const { data, isError } = await fetchFantasy<
		Fantasy.LeagueTeamsResponse<Params>
	>(`league/${league_key}/teams;${params}`)

	if (isError || !data) {
		return { isError }
	}

	const [league, { teams }] = data.fantasy_content.league
	return { data, league, teams: getPluralItems(teams) }
}
