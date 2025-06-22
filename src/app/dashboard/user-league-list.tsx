import { fetchUserLeagues } from '@/lib/yahoo/fetch'
import { flatten, getPluralItems } from '@/lib/yahoo/utils'
import { Suspense } from 'react'
import Loading from '@/ui/loading'
import UserLeague from './user-league'

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
