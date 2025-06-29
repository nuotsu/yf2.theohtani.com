import { Flatten, flatten } from '@/lib/yahoo/utils'
import { cn } from '@/lib/utils'
import css from './player.module.css'

export default function ({ player }: { player: Fantasy.RosterPlayer }) {
	const [p0, ...p] = player.player
	const [{ name, status }, playerData, ...rest] = [flatten(p0), ...p]

	const starting_status = flatten(
		flatten(rest).starting_status ?? [],
	) as Flatten<Fantasy.RosterPlayerStarting['starting_status']>

	const { position } = flatten(playerData.selected_position)

	return (
		<details name="player" className="group/player open:relative">
			<summary
				className={cn(
					css.player,
					'bg-background flex items-center gap-x-[.5ch] text-sm group-not-open/player:px-[.5ch]',
					starting_status.is_starting && 'bg-green-400/20',
					{
						'group-not-open/player:*:text-red-600 group-not-open/player:dark:*:text-red-400':
							status,
						'group-not-open/player:bg-red-400/20': ['IL60', 'NA'].includes(
							status,
						),
						'group-not-open/player:opacity-50': ['BN', 'IL'].includes(position),
					},
				)}
				data-position={position}
			>
				{/* <img
					className="h-lh w-auto shrink-0"
					src={playerInfo.image_url}
					width={46}
					height={60}
					alt={name.full}
				/> */}
				<span className="line-clamp-1 grow overflow-hidden break-all">
					{name.first.slice(0, 1)}. {name.last}
				</span>
				<span className="text-foreground/50 shrink-0 text-[x-small]">
					{position}
				</span>
			</summary>

			<div className="bg-background absolute inset-x-0 top-full">test</div>
		</details>
	)
}
