import { fetchFantasyLive } from '@/lib/yahoo/live'
import { getPluralItems } from '@/lib/yahoo/utils'
import Loading from '@/ui/loading'
import RosterList from '@/ui/yahoo/roster/roster-list'

export default function ({
	scoreboard,
}: {
	scoreboard: Fantasy.LeagueScoreboard
}) {
	const matchups = getPluralItems(scoreboard.scoreboard[0].matchups)

	const team_keys = matchups
		.flatMap(({ matchup }) => getPluralItems(matchup[0].teams))
		.map(({ team }) => team[0][0].team_key)

	const all_rosters = team_keys.map((team_key) =>
		fetchFantasyLive<Fantasy.RosterResponse>(`team/${team_key}/roster`),
	)

	if (all_rosters.some(({ isLoading }) => isLoading))
		return <Loading className="col-span-full">Loading rosters...</Loading>

	const rosters = all_rosters.map(({ data }) => data?.fantasy_content.team)

	return <RosterList rosters={rosters} />
}
