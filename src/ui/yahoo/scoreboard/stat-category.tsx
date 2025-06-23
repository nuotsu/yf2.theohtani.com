'use client'

import { useScoreboardContext } from './context'

export default function ({
	stat_categories,
	stat,
}: {
	stat_categories: Fantasy.StatCategories
	stat: Fantasy.TeamStats['team_stats']['stats'][number]['stat']
}) {
	const { selectedStatCategory, setSelectedStatCategory } =
		useScoreboardContext()

	const stat_category = stat_categories.stats.find(
		(stats) => stats.stat.stat_id.toString() === stat.stat_id,
	)

	return (
		<label
			className="not-has-checked:text-foreground/50 hover:text-foreground m-auto w-full transition-colors has-checked:font-bold has-[input]:cursor-pointer"
			data-group={stat_category?.stat.group}
		>
			{![60].includes(stat_category?.stat.stat_id!) && (
				<input
					name="stat-category"
					value={stat_category?.stat.stat_id}
					type="radio"
					hidden
					onClick={() => {
						if (selectedStatCategory === stat_category?.stat.stat_id) {
							setSelectedStatCategory(undefined)
						} else {
							setSelectedStatCategory(stat_category?.stat.stat_id)
						}
					}}
					onChange={() => setSelectedStatCategory(stat_category?.stat.stat_id)}
					checked={selectedStatCategory === stat_category?.stat.stat_id}
				/>
			)}

			<small>{stat_category?.stat.abbr}</small>
		</label>
	)
}
