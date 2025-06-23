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
			next: {
				revalidate: 60 * 60, // seconds
				tags: ['fantasy', endpoint],
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

export async function fetchLeagueStandings(league_key: string) {
	const { data, isError } = await fetchFantasy<
		Fantasy.LeagueStandingsResponse<[Fantasy.TeamStats, Fantasy.TeamStandings]>
	>(`league/${league_key}/standings`)

	if (isError || !data) {
		return { isError }
	}

	return {
		data,
		standings: getPluralItems(
			data.fantasy_content.league[1].standings[0].teams,
		),
	}
}

export async function fetchLeagueScoreboard(league_key: string) {
	const { data, isError } =
		await fetchFantasy<Fantasy.LeagueScoreboardResponse>(
			`league/${league_key}/scoreboard`,
		)

	if (isError || !data) {
		return { isError }
	}

	return { data, scoreboard: data.fantasy_content.league[1] }
}

export async function fetchLeagueSettings(league_key: string) {
	const { data, isError } = await fetchFantasy<Fantasy.LeagueSettingsResponse>(
		`league/${league_key}/settings`,
	)

	if (isError || !data) {
		return { isError }
	}

	return { data, settings: data.fantasy_content.league[1] }
}
