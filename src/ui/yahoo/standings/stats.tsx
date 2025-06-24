'use client'

import { useStandingsContext } from './context'
import { cn } from '@/lib/utils'

export default function ({
	team_key,
	team_standings,
}: {
	team_key: string
	team_standings: Fantasy.TeamStandings['team_standings']
}) {
	const { scoreboard, calculateProjections } = useStandingsContext()

	const {
		games_back,
		outcome_totals: { wins, losses, ties, percentage },
	} = team_standings

	const { p_wins, p_losses, p_ties, p_percentage, p_games_back } =
		calculateProjections?.({
			team_key,
			team_standings,
		}) ?? {}

	// const leader = standings?.map((s) =>
	// 	calculateProjections?.({
	// 		team_key: flatten(s.team[0]).team_key,
	// 		team_standings,
	// 	}),
	// )
	// .sort((a, b) => Number(b?.p_percentage) - Number(a?.p_percentage))

	return (
		<>
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
		</>
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
