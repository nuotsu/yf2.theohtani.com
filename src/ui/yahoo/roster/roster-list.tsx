import Roster from './roster'

export default function ({
	rosters,
}: {
	rosters: Array<[Fantasy.TeamInfo, Fantasy.Roster] | undefined>
}) {
	return (
		<div className="group/roster order-last col-span-full grid grid-cols-subgrid before:col-start-1 before:row-start-2">
			<label className="order-first col-span-full cursor-pointer">
				<input type="checkbox" hidden />
				<span className="sticky left-0">Roster</span>
			</label>

			{rosters?.map((roster, key) => (
				<Roster roster={roster} key={key} />
			))}
		</div>
	)
}
