'use client'

import { useStandingsContext } from './context'
import { flatten } from '@/lib/yahoo/utils'
import TeamLogo from '@/ui/yahoo/team-logo'
import { cn } from '@/lib/utils'
import css from './standing.module.css'
import { VscArrowSmallUp, VscArrowSmallDown } from 'react-icons/vsc'

export default function ({
	team,
}: {
	team: {
		team: Fantasy.Team<[Fantasy.TeamStats, Fantasy.TeamStandings]>
	}
}) {
	const { scoreboard, calculateProjections, getProjectedRank } =
		useStandingsContext()

	const [t0, ...t] = team.team
	const [teamInfo, teamStats, { team_standings }] = [flatten(t0), ...t]

	const {
		rank,
		games_back,
		outcome_totals: { wins, losses, ties, percentage },
	} = team_standings

	const { p_wins, p_losses, p_ties, p_percentage, p_games_back } =
		calculateProjections?.({
			team_key: teamInfo.team_key,
			team_standings,
		}) ?? {}

	const p_rank = getProjectedRank?.(teamInfo.team_key) || Number(rank)

	return (
		<li
			className={cn(
				'col-span-full grid grid-cols-subgrid',
				'group-has-[#show-projection:checked]:[&_[for="show-projection"]]:bg-amber-400/15',
				teamInfo.is_owned_by_current_login &&
					'dark:bg-foreground/20 bg-foreground/10 font-bold',
			)}
			key={teamInfo.team_key}
		>
			<label
				htmlFor="show-projection"
				className="grid place-items-stretch text-center *:col-span-full *:row-span-full *:min-w-max group-has-[#show-projection:not(:checked)]:px-[.5ch]"
			>
				<span className="group-has-[#show-projection:checked]:opacity-0">
					{rank}
				</span>
				<span className="relative inline-block group-has-[#show-projection:not(:checked)]:opacity-0">
					{p_rank}
					<span className="absolute inset-0 grid items-center justify-end">
						{p_rank < Number(rank) ? (
							<VscArrowSmallUp className="text-green-500" />
						) : (
							p_rank > Number(rank) && (
								<VscArrowSmallDown className="text-red-500" />
							)
						)}
					</span>
				</span>
			</label>

			{/* TODO: backdrop-blur not working... */}
			<TeamLogo
				teamInfo={teamInfo}
				className="size-lh sticky left-0 z-1 backdrop-blur-sm"
			/>

			<label
				htmlFor="show-manager"
				className={cn(
					css.name,
					'*:pl-ch relative *:pr-[.5ch]',
					'[--color:var(--c-color)] group-has-[#show-projection:checked]:[--color:var(--p-color)]',
					'[--percentage:var(--c-percentage)] group-has-[#show-projection:checked]:[--percentage:var(--p-percentage)]',
				)}
				style={
					{
						'--c-color':
							Number(percentage) > 0.5
								? 'var(--color-green-600)'
								: 'var(--color-red-600)',
						'--p-color':
							Number(p_percentage) > 0.5
								? 'var(--color-green-600)'
								: 'var(--color-red-600)',
						'--c-percentage': `${(Number(percentage) * 100).toFixed(1)}%`,
						'--p-percentage': `${(Number(p_percentage) * 100).toFixed(1)}%`,
					} as React.CSSProperties
				}
			>
				<em className="group-has-[#show-manager:checked]:opacity-0">
					{teamInfo.name}
				</em>

				<span className="absolute inset-0 group-has-[#show-manager:not(:checked)]:hidden">
					{teamInfo.managers
						.map(({ manager }: Fantasy.Manager) => manager.nickname)
						.join(', ')}
				</span>
			</label>

			<label
				htmlFor="show-projection"
				className="grid place-content-center px-[.5ch] text-center tabular-nums *:col-span-full *:row-span-full *:min-w-max"
			>
				<span className="group-has-[#show-projection:checked]:opacity-0">
					{wins}-{losses}-{ties}
				</span>
				{scoreboard && (
					<span className="group-has-[#show-projection:not(:checked)]:opacity-0">
						{p_wins}-{p_losses}-{p_ties}
					</span>
				)}
			</label>

			<label
				htmlFor="show-projection"
				className="grid place-content-center px-[.5ch] text-center tabular-nums *:col-span-full *:row-span-full *:min-w-max"
			>
				<span
					className={cn(
						'group-has-[#show-projection:checked]:opacity-0',
						colorize(percentage),
					)}
				>
					{percentage}
				</span>
				{scoreboard && (
					<span
						className={cn(
							'group-not-has-[#show-projection]:hidden group-has-[#show-projection:not(:checked)]:opacity-0',
							colorize(p_percentage),
						)}
					>
						{p_percentage}
					</span>
				)}
			</label>

			<label
				htmlFor="show-projection"
				className="grid px-[.5ch] text-center tabular-nums *:col-span-full *:row-span-full *:min-w-max"
			>
				<span className="group-has-[#show-projection:checked]:opacity-0">
					{formatGamesBack(games_back)}
				</span>
				{scoreboard && (
					<span className="group-not-has-[#show-projection]:hidden group-has-[#show-projection:not(:checked)]:opacity-0">
						{formatGamesBack(p_games_back)}
					</span>
				)}
			</label>

			<label
				htmlFor="show-trades"
				className="relative px-[.5ch] text-center tabular-nums"
			>
				<span
					className={cn(
						'group-has-[#show-trades:checked]:opacity-0',
						teamInfo.number_of_moves <= 0 && 'text-foreground/50',
					)}
				>
					{teamInfo.number_of_moves}
				</span>
				<span
					className={cn(
						'absolute inset-0 group-has-[#show-trades:not(:checked)]:hidden',
						teamInfo.number_of_trades <= 0 && 'text-foreground/50',
					)}
				>
					{teamInfo.number_of_trades}
				</span>
			</label>
		</li>
	)
}

function colorize(percentage?: string) {
	if (!percentage) return ''
	if (Number(percentage) > 0.5) return 'text-green-600 dark:text-green-200'
	if (Number(percentage) < 0.5) return 'text-red-600 dark:text-red-200'
	return ''
}

function formatGamesBack(games_back?: string) {
	return games_back !== '-' ? Number(games_back).toFixed(1) : games_back
}
