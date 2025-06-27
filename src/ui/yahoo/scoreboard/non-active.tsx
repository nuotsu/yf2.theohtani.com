import { fetchFantasyRoster, fetchLeagueScoreboard } from '@/lib/yahoo/fetch'
import { redirect } from 'next/navigation'
import { getPluralItems } from '@/lib/yahoo/utils'
import Scoreboard from '.'
import RosterList from '@/ui/yahoo/roster/roster-list'
import { Suspense } from 'react'
import Loading from '@/ui/loading'

export default async function ({
	league_key,
	settings,
}: {
	league_key: string
	settings: Fantasy.LeagueSettings
}) {
	const { scoreboard } = await fetchLeagueScoreboard(league_key)

	if (!scoreboard) redirect('/')

	const matchups = getPluralItems(scoreboard.scoreboard[0].matchups)
	const team_keys = matchups
		.flatMap(({ matchup }) => getPluralItems(matchup[0].teams))
		.map(({ team }) => team[0][0].team_key)

	const rosters = await Promise.all(
		team_keys.map((team_key) => fetchFantasyRoster(team_key)),
	)

	return (
		<Scoreboard scoreboard={scoreboard} settings={settings}>
			<Suspense
				fallback={
					<Loading className="col-span-full">Loading rosters...</Loading>
				}
			>
				<RosterList rosters={rosters.map(({ roster }) => roster)} />
			</Suspense>
		</Scoreboard>
	)
}
