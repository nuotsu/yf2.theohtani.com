import { Flatten, flatten } from '@/lib/yahoo/utils'
import { cn } from '@/lib/utils'
import css from './player.module.css'

export default function ({ player }: { player: Fantasy.RosterPlayer }) {
	const [p0, ...p] = player.player

	const [{ name, status, ...playerInfo }, playerData, ...rest] = [
		flatten(p0),
		...p,
	]

	const starting_status = flatten(
		flatten(rest).starting_status ?? [],
	) as Flatten<Fantasy.RosterPlayerStarting['starting_status']>

	const { position } = flatten(playerData.selected_position)

	return (
		<details
			name="player"
			className={cn(
				css.root,
				'group/player ring-foreground/50 open:bg-background text-sm open:relative open:-ml-[.5ch] open:w-[calc(100%+1ch)] open:ring-2',
			)}
			data-position={position}
		>
			<summary
				className={cn(
					'flex items-center gap-x-[.5ch] px-[.5ch]',
					starting_status.is_starting &&
						'group-not-open/player:bg-green-400/20',
					{
						'group-not-open/player:*:text-red-600 group-not-open/player:dark:*:text-red-400':
							status,
						'group-not-open/player:bg-red-400/20': ['IL60', 'NA'].includes(
							status,
						),
						'group-not-open/player:opacity-50': ['BN', 'IL'].includes(position),
					},
				)}
			>
				<span className="line-clamp-1 grow overflow-hidden break-all">
					<span className="group-not-open/player:hidden">{name.full}</span>
					<span className="group-open/player:hidden">
						{name.first.slice(0, 1)}. {name.last}
					</span>
				</span>

				<span className="text-foreground/50 flex shrink-0 text-[x-small] group-open/player:hidden">
					{position}
				</span>
			</summary>

			<div className="flex flex-col gap-y-[.5ch] px-[.5ch]">
				<div className="gap-x-ch flex items-center">
					<img
						className="h-lh w-auto shrink-0"
						src={playerInfo.image_url}
						width={46}
						height={60}
						alt={name.full}
					/>
					<span className="text-foreground/50 shrink-0 grow text-[x-small]">
						{playerInfo.editorial_team_abbr}
					</span>
					<span className="text-foreground/50 line-clamp-1 text-[x-small] break-all">
						{playerInfo.display_position}
					</span>
				</div>

				{status && (
					<p className="text-xs text-red-600 dark:text-red-400">
						{status}{' '}
						{!!playerInfo?.injury_note && ` (${playerInfo.injury_note})`}
					</p>
				)}
			</div>
		</details>
	)
}
