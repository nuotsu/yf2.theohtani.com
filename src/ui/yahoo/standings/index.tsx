import { flatten } from '@/lib/yahoo/utils'
import TeamLogo from '@/ui/yahoo/team-logo'
import { cn } from '@/lib/utils'
import css from './Standings.module.css'

export default function ({
	standings,
}: {
	standings?: {
		team: Fantasy.Team<[Fantasy.TeamStats, Fantasy.TeamStandings]>
	}[]
}) {
	if (!standings) return <div>No standings.</div>

	return (
		<div className="group overflow-x-auto whitespace-nowrap">
			<input id="show-manager" type="checkbox" hidden />
			<input id="show-trades" type="checkbox" hidden />

			<ol
				className="gap-x-ch inline-grid"
				style={{
					gridTemplateColumns:
						'min-content 1lh  min-content min-content min-content min-content min-content',
				}}
			>
				<li className="text-foreground/50 col-span-full grid grid-cols-subgrid text-center">
					<small>#</small>
					<label
						htmlFor="show-manager"
						className="col-span-2 cursor-pointer text-[small]"
					>
						<span className="group-has-[#show-manager:checked]:hidden">
							Team
						</span>
						<span className="group-has-[#show-manager:not(:checked)]:hidden">
							Manager
						</span>
					</label>
					<small>W-L-T</small>
					<small>Pct</small>
					<small>GB</small>
					<label
						htmlFor="show-trades"
						className="relative cursor-pointer text-center text-[small]"
					>
						<span className="group-has-[#show-trades:checked]:opacity-0">
							Moves
						</span>
						<span className="absolute inset-0 group-has-[#show-trades:not(:checked)]:hidden">
							Trades
						</span>
					</label>
				</li>

				{standings.map(({ team: [t0, ...t] }) => {
					const [teamInfo, teamStats, { team_standings }] = [flatten(t0), ...t]
					const { wins, losses, ties, percentage } =
						team_standings.outcome_totals

					return (
						<li
							className={cn(
								'col-span-full grid grid-cols-subgrid',
								teamInfo.is_owned_by_current_login && 'bg-foreground/20',
							)}
							key={teamInfo.team_key}
						>
							<span className="text-center">{team_standings.rank}</span>

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
									'text-green-600 dark:text-green-200':
										Number(percentage) > 0.5,
									'text-red-600 dark:text-red-200': Number(percentage) < 0.5,
								})}
							>
								{percentage}
							</span>

							<span className="text-center tabular-nums">
								{team_standings.games_back}
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
				})}
			</ol>
		</div>
	)
}
