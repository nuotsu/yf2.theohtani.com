'use client'

import { flatten, getPluralItems } from '@/lib/yahoo/utils'
import Matchup from './matchup'

export default function ({ matchup }: { matchup: Fantasy.Matchup }) {
	const teams = getPluralItems(matchup[0].teams)

	const is_user_matchup = teams.some(
		({ team }) => flatten(team[0]).is_owned_by_current_login,
	)

	return (
		<>
			{teams.map((team, key) => (
				<Matchup
					team={team}
					is_user_matchup={is_user_matchup}
					stat_winners={matchup.stat_winners}
					index={key}
					key={key}
				/>
			))}
		</>
	)
}
