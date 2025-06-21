import { fetchLeagueTeams, fetchUserLeagues } from '@/lib/yahoo/fetch'
import { Flatten, flatten, getPluralItems } from '@/lib/yahoo/utils'
import { FaYahoo } from 'react-icons/fa6'

export default async function () {
	const userLeagues = await fetchUserLeagues()

	const leagues = userLeagues
		.reverse()
		.flatMap((league) =>
			getPluralItems(
				flatten(league.game).leagues as Fantasy.Plural<Fantasy.League>,
			),
		)
		.map((league) => flatten(league.league))

	return (
		<section className="@container">
			<h2>All Leagues</h2>

			<ul>
				{leagues.map((league) => (
					<UserLeague league={league} key={league.league_key} />
				))}
			</ul>
		</section>
	)
}

const SPORT_EMOJI_MAP = {
	mlb: '⚾',
	nba: '🏀',
	nfl: '🏈',
	nhl: '🏒',
} as const

async function UserLeague({
	league,
}: {
	league: Flatten<[Fantasy.LeagueInfo]>
}) {
	const teams = await fetchLeagueTeams(league.league_key)

	const userTeam = flatten(
		teams.find((team) => flatten(team.team[0]).is_owned_by_current_login)
			?.team[0] ?? [],
	)

	return (
		<li className="gap-ch flex items-center">
			<figure className="size-lh shrink-0">
				{league.logo_url && <img src={league.logo_url} alt="" loading="lazy" />}
			</figure>

			<div className="gap-x-ch flex flex-wrap @max-md:flex-col @md:items-center">
				<strong>{league.name}</strong>
				<small>{userTeam.name}</small>
			</div>

			<span className="ml-auto flex shrink-0 items-center gap-[.5ch] tabular-nums">
				{SPORT_EMOJI_MAP[league.game_code as keyof typeof SPORT_EMOJI_MAP]}{' '}
				{league.season}
			</span>

			<a href={league.url} className="text-yahoo-purple">
				<FaYahoo />
			</a>
		</li>
	)
}
