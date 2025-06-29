'use client'

import { flatten, getPluralItems } from '@/lib/yahoo/utils'
import TeamLogo from '@/ui/yahoo/team-logo'
import Player from './player'
import { fetchFantasyLive } from '@/lib/yahoo/live'

export default function ({ team_key }: { team_key: string }) {
	const { data, isLoading } = fetchFantasyLive<Fantasy.RosterResponse>(
		`team/${team_key}/roster`,
	)

	if (isLoading || !data?.fantasy_content) return null

	const [t0, { roster }] = data?.fantasy_content.team

	const teamInfo = flatten(t0)
	const players = getPluralItems(roster[0].players)

	return (
		<div
			className="text-left group-not-has-[#show-rosters:checked]:hidden"
			data-roster={teamInfo.team_key}
		>
			<TeamLogo teamInfo={teamInfo} className="size-lh mx-auto my-[.5ch]" />

			{players.map((player, key) => (
				<Player player={player} key={key} />
			))}
		</div>
	)
}
