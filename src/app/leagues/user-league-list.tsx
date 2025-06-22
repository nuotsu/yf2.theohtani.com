import { fetchUserLeagues } from '@/lib/yahoo/fetch'
import { flatten, getPluralItems } from '@/lib/yahoo/utils'
import { Suspense } from 'react'
import Loading from '@/ui/loading'
import UserLeague from './user-league'

export default async function () {
	const { userLeagues } = await fetchUserLeagues()

	if (!userLeagues)
		return <div className="text-foreground/50">No leagues found.</div>

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
		<Suspense fallback={<Loading>Loading leagues...</Loading>}>
			<ul className="@conatiner">
				{leagues.map((league) => (
					<UserLeague
						league={league}
						game={league.game}
						key={league.league_key}
					/>
				))}
			</ul>
		</Suspense>
	)
}
