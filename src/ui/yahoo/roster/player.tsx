import { Flatten, flatten } from '@/lib/yahoo/utils'

export default function ({ player }: { player: Fantasy.RosterPlayer }) {
	const [p0, ...p] = player.player
	const [playerInfo, playerData] = [flatten(p0), ...p]

	return (
		<li className="line-clamp-1 text-sm break-all text-ellipsis">
			{playerInfo.name.first.slice(0, 1)}. {playerInfo.name.last}
		</li>
	)
}
