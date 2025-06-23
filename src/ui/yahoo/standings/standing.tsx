import { flatten } from '@/lib/yahoo/utils'
import TeamLogo from '@/ui/yahoo/team-logo'
import { cn } from '@/lib/utils'
import css from './Standing.module.css'

export default function ({
	team,
}: {
	team: {
		team: Fantasy.Team<[Fantasy.TeamStats, Fantasy.TeamStandings]>
	}
}) {
	const [t0, ...t] = team.team

	const [
		teamInfo,
		teamStats,
		{
			team_standings: { outcome_totals, rank, games_back },
		},
	] = [flatten(t0), ...t]
	const { wins, losses, ties, percentage } = outcome_totals

	return (
		<li
			className={cn(
				'col-span-full grid grid-cols-subgrid',
				teamInfo.is_owned_by_current_login &&
					'dark:bg-foreground/20 bg-foreground/10',
			)}
			key={teamInfo.team_key}
		>
			<span className="text-center">{rank}</span>

			<TeamLogo
				teamInfo={teamInfo}
				className="size-lh sticky left-0 z-1 backdrop-blur-sm"
			/>

			<label
				htmlFor="show-manager"
				className={cn(css.name, 'relative')}
				style={
					{
						'--color':
							Number(percentage) > 0.5
								? 'var(--color-green-600)'
								: 'var(--color-red-600)',
						'--percentage': `${Number(percentage) * 100}%`,
					} as React.CSSProperties
				}
			>
				<em className="font-bold group-has-[#show-manager:checked]:opacity-0">
					{teamInfo.name}
				</em>

				<span className="absolute inset-0 group-has-[#show-manager:not(:checked)]:hidden">
					{teamInfo.managers
						.map(({ manager }: Fantasy.Manager) => manager.nickname)
						.join(', ')}
				</span>
			</label>

			<span className="text-center tabular-nums">
				{wins}-{losses}-{ties}
			</span>

			<span
				className={cn('text-center tabular-nums', {
					'text-green-600 dark:text-green-200': Number(percentage) > 0.5,
					'text-red-600 dark:text-red-200': Number(percentage) < 0.5,
				})}
			>
				{percentage}
			</span>

			<span className="text-center tabular-nums">
				{games_back !== '-' ? Number(games_back).toFixed(1) : games_back}
			</span>

			<label
				htmlFor="show-trades"
				className="relative text-center tabular-nums"
			>
				<span className="group-has-[#show-trades:checked]:opacity-0">
					{teamInfo.number_of_moves}
				</span>
				<span className="absolute inset-0 group-has-[#show-trades:not(:checked)]:hidden">
					{teamInfo.number_of_trades}
				</span>
			</label>
		</li>
	)
}
