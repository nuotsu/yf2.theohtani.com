import { getPluralItems } from '@/lib/yahoo/utils'
import ColumnHeader from './column-header'
import Matchups from './matchups'

export default function ({ scoreboard }: { scoreboard?: Fantasy.Scoreboard }) {
	if (!scoreboard) return null

	const matchups = getPluralItems(scoreboard.scoreboard[0].matchups)
	const stats = matchups[0].matchup[0].teams[0].team[1].team_stats.stats

	return (
		<div
			className="inline-grid max-w-full snap-x snap-mandatory gap-x-[.5ch] overflow-x-auto"
			style={{
				gridTemplateColumns: `auto repeat(${matchups.length * 2}, 1fr)`,
				gridTemplateRows: `repeat(${stats.length + 1}, auto)`,
			}}
		>
			<ColumnHeader scoreboard={scoreboard} stats={stats} />

			{matchups.map(({ matchup }, key) => (
				<Matchups matchup={matchup} key={key} />
			))}
		</div>
	)
}
