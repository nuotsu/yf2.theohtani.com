import { fetchLeagueTeams, fetchUserLeagues } from '@/lib/yahoo/fetch'
import { Flatten, flatten, getPluralItems } from '@/lib/yahoo/utils'
import { Suspense } from 'react'
import Loading from '@/ui/loading'
import Emoji from '@/ui/yahoo/emoji'
import { formatOrdinal } from '@/lib/utils'
import { FaYahoo } from 'react-icons/fa6'

export default async function () {
	const userLeagues = await fetchUserLeagues()

	const leagues = userLeagues
		.reverse()
		.flatMap((league) => {
			const game = flatten(league.game)
			return getPluralItems(game.leagues as Fantasy.Plural<Fantasy.League>).map(
				(league) => ({ ...league, game }),
			)
		})
		.map((league) => {
			const leagueInfo = flatten(league.league)
			return { ...leagueInfo, game: league.game }
		})

	return (
		<section className="@container">
			<h2>All Leagues</h2>

			<Suspense fallback={<Loading>Loading leagues...</Loading>}>
				<ul>
					{leagues.map((league) => (
						<UserLeague
							league={league}
							game={league.game}
							key={league.league_key}
						/>
					))}
				</ul>
			</Suspense>
		</section>
	)
}

async function UserLeague({
	league,
	game,
}: {
	league: Flatten<[Fantasy.LeagueInfo]>
	game: Flatten<Fantasy.Game>
}) {
	const teams = await fetchLeagueTeams(league.league_key)

	const userTeam = teams.find(
		(team) => flatten(team.team[0]).is_owned_by_current_login,
	)
	const userTeamInfo = flatten(userTeam?.team[0] ?? [])
	// const userTeamStats = userTeam?.team[1]
	const { rank } = userTeam?.team[2].team_standings ?? {}

	return (
		<li className="gap-ch flex items-center">
			<figure className="grid size-12 shrink-0 place-items-center text-center *:col-span-full *:row-span-full">
				{league.logo_url ? (
					<img
						src={league.logo_url}
						alt={league.name}
						width={192}
						height={192}
						loading="lazy"
					/>
				) : (
					'🏆'
				)}

				{!game.is_game_over && (
					<b className="inline-block shrink-0 animate-pulse bg-green-500 px-[.5ch] text-[8px] text-white uppercase dark:bg-green-600">
						Active
					</b>
				)}
			</figure>

			<div className="gap-x-ch flex flex-wrap @max-md:flex-col @md:items-center">
				<strong className="line-clamp-1 break-all">{league.name}</strong>
				<small className="flex gap-x-[.5ch]">
					<em className="line-clamp-1 break-all">{userTeamInfo.name}</em>

					{rank && (
						<>
							—<b>{formatOrdinal(rank)}</b>
						</>
					)}
				</small>
			</div>

			<span className="ml-auto flex shrink-0 items-center gap-x-[.5ch] tabular-nums @max-sm:flex-col @max-sm:items-center">
				<Emoji code={league.game_code} />
				<span className="@max-sm:text-xs">{league.season}</span>
			</span>

			<a
				href={league.url}
				className="text-yahoo-purple p-ch -ml-ch inline-block"
			>
				<FaYahoo />
			</a>
		</li>
	)
}
