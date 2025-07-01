import { getPluralItems } from '@/lib/yahoo/utils'
import { ScoreboardProvider } from './context'
import ColumnHeader from './column-header'
import Matchups from './matchups'

export default function ({
	scoreboard,
	settings,
}: {
	scoreboard?: Fantasy.LeagueScoreboard
	settings: Fantasy.LeagueSettings
}) {
	if (!scoreboard || !settings) return null

	const matchups = getPluralItems(scoreboard.scoreboard[0].matchups)

	if (!matchups[0]) return null

	const stats = matchups[0].matchup[0].teams[0].team[1].team_stats.stats

	return (
		<ScoreboardProvider value={{ scoreboard, settings, matchups }}>
			<div
				className="group inline-grid max-w-full snap-x snap-mandatory gap-x-[calc(.5ch-1px)] gap-y-px overflow-x-auto py-px pr-[.5ch] has-[[name=stat-category]:checked]:gap-x-px"
				style={{
					gridTemplateColumns: `auto repeat(${matchups.length * 2}, 1fr)`,
					gridTemplateRows: `repeat(${stats.length + 1}, auto)`,
				}}
			>
				<ColumnHeader
					scoreboard={scoreboard}
					settings={settings}
					stats={stats}
				/>

				{matchups.map(({ matchup }, key) => (
					<Matchups matchup={matchup} key={key} />
				))}
			</div>
		</ScoreboardProvider>
	)
}
