'use client'

import { useEffect, useRef } from 'react'
import StatCategory from './stat-category'

export default function ({
	scoreboard,
	settings,
	stats,
}: {
	scoreboard: Fantasy.LeagueScoreboard
	settings: Fantasy.LeagueSettings
	stats: Fantasy.TeamStats['team_stats']['stats']
}) {
	const ref = useRef<HTMLDivElement>(null)

	const { stat_categories } = settings.settings[0]

	useEffect(() => {
		if (!ref.current || typeof document === 'undefined') return

		function setColumnHeaderWidth() {
			document.documentElement.style.setProperty(
				'--column-header-width',
				`${ref.current?.offsetWidth ?? 0}px`,
			)
		}

		setColumnHeaderWidth()
		window.addEventListener('resize', setColumnHeaderWidth)
		return () => window.removeEventListener('resize', setColumnHeaderWidth)
	}, [ref])

	return (
		<div
			ref={ref}
			className="sticky left-0 z-1 order-first grid min-w-max snap-start grid-rows-subgrid text-center backdrop-blur-sm"
			style={{ gridRow: `span ${stats.length + 1}` }}
		>
			<small className="text-foreground/50 m-auto grid leading-none">
				Week
				<span>{scoreboard.scoreboard.week}</span>
			</small>

			{stats.map(({ stat }) => (
				<StatCategory
					stat_categories={stat_categories}
					stat={stat}
					key={stat.stat_id}
				/>
			))}
		</div>
	)
}
