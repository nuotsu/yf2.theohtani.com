'use client'

import { useQueryState } from 'nuqs'

export default function ({
	settings,
	currentWeek,
	refreshOnChange,
}: {
	settings: Fantasy.LeagueSettings
	currentWeek: number
	refreshOnChange?: boolean
}) {
	if (!settings) return null

	const [weekQuery, setWeekQuery] = useQueryState('week')

	const { week_has_enough_qualifying_days } = settings.settings[1]

	return (
		<select
			id="week"
			className="appearance-none text-center"
			value={weekQuery ?? currentWeek}
			onChange={(e) => {
				setWeekQuery(e.currentTarget.value).then(() => {
					if (refreshOnChange && typeof window !== 'undefined') {
						window.location.reload()
					}
				})
			}}
		>
			{Object.entries(week_has_enough_qualifying_days).map(
				([week, has_enough_qualifying_days]) => (
					<option
						value={week}
						disabled={!has_enough_qualifying_days}
						key={week}
					>
						Week {week} {week === currentWeek.toString() && ` (Current)`}
					</option>
				),
			)}
		</select>
	)
}
