import { cn } from '@/lib/utils'
import { StandingsProvider } from './context'
import Standing from './standing'

export default function ({
	standings,
	scoreboard,
}: {
	standings?: {
		team: Fantasy.Team<[Fantasy.TeamStats, Fantasy.TeamStandings]>
	}[]
	scoreboard?: Fantasy.LeagueScoreboard
}) {
	if (!standings) return <div>No standings.</div>

	return (
		<StandingsProvider value={{ standings, scoreboard }}>
			<div className="group overflow-fade-r pr-ch overflow-x-auto whitespace-nowrap">
				<input id="show-manager" type="checkbox" hidden />
				{scoreboard && <input id="show-projection" type="checkbox" hidden />}
				<input id="show-trades" type="checkbox" hidden />

				<ol
					className="inline-grid"
					style={{
						gridTemplateColumns:
							'min-content 1lh  min-content min-content min-content min-content min-content',
					}}
				>
					<li className="*:text-foreground/50 col-span-full grid grid-cols-subgrid text-center text-[small] *:px-[.5ch] [&_label]:cursor-pointer">
						<label htmlFor="show-projection">Rank</label>
						<label htmlFor="show-manager" className="col-span-2">
							<span className="group-has-[#show-manager:checked]:hidden">
								Team
							</span>
							<span className="group-has-[#show-manager:not(:checked)]:hidden">
								Manager
							</span>
						</label>
						<label htmlFor="show-projection">W-L-T</label>
						<label htmlFor="show-projection">Pct</label>
						<label htmlFor="show-projection">GB</label>
						<label htmlFor="show-trades" className="relative text-center">
							<span className="group-has-[#show-trades:checked]:opacity-0">
								Moves
							</span>
							<span className="absolute inset-0 group-has-[#show-trades:not(:checked)]:hidden">
								Trades
							</span>
						</label>
					</li>

					{standings.map((team) => (
						<Standing team={team} key={team.team[0][0].team_key} />
					))}
				</ol>
			</div>
		</StandingsProvider>
	)
}
