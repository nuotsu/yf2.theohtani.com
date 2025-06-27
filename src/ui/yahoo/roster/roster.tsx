import { flatten, getPluralItems } from '@/lib/yahoo/utils'
import TeamLogo from '@/ui/yahoo/team-logo'
import Player from './player'
import { cn } from '@/lib/utils'

export default function ({
	roster,
}: {
	roster?: [Fantasy.TeamInfo, Fantasy.Roster]
}) {
	if (!roster) return <div />

	const [teamInfo, { roster: r }] = [flatten(roster[0]), roster[1]]

	const players = getPluralItems(r[0].players)

	return (
		<div
			className={cn('group-not-has-[:checked]/roster:hidden')}
			data-roster={teamInfo.team_key}
		>
			<TeamLogo teamInfo={teamInfo} className="size-lh mx-auto" />

			<ul>
				{players.map((player, key) => (
					<Player player={player} key={key} />
				))}
			</ul>
		</div>
	)
}
