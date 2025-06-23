import Standing from './standing'

export default function ({
	standings,
}: {
	standings?: {
		team: Fantasy.Team<[Fantasy.TeamStats, Fantasy.TeamStandings]>
	}[]
}) {
	if (!standings) return <div>No standings.</div>

	return (
		<div className="group overflow-fade-r pr-ch overflow-x-auto whitespace-nowrap">
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
					<small>Rank</small>
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

				{standings.map((team) => (
					<Standing team={team} key={team.team[0][0].team_key} />
				))}
			</ol>
		</div>
	)
}
