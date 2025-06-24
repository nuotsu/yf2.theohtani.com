import { flatten } from '@/lib/yahoo/utils'
import TeamLogo from '@/ui/yahoo/team-logo'
import Stats from './stats'
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

	const [teamInfo, teamStats, { team_standings }] = [flatten(t0), ...t]
	const {
		rank,
		outcome_totals: { percentage },
	} = team_standings

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
			<label htmlFor="show-projection" className="px-[.5ch] text-center">
				<span className="group-has-[#show-projection:checked]:opacity-0">
					{rank}
				</span>
			</label>

			{/* TODO: backdrop-blur not working... */}
			<TeamLogo
				teamInfo={teamInfo}
				className="size-lh sticky left-0 z-1 backdrop-blur-sm"
			/>

			<label
				htmlFor="show-manager"
				className={cn(css.name, '*:pl-ch relative *:pr-[.5ch]')}
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
				<em className="group-has-[#show-manager:checked]:opacity-0">
					{teamInfo.name}
				</em>

				<span className="absolute inset-0 group-has-[#show-manager:not(:checked)]:hidden">
					{teamInfo.managers
						.map(({ manager }: Fantasy.Manager) => manager.nickname)
						.join(', ')}
				</span>
			</label>

			<Stats team_key={teamInfo.team_key} team_standings={team_standings} />

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
