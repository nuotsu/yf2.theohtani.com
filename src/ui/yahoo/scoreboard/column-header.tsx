'use client'

import { useEffect, useRef } from 'react'

export default function ({
	scoreboard,
	stats,
}: {
	scoreboard: Fantasy.Scoreboard
	stats: Fantasy.TeamStats['team_stats']['stats']
}) {
	const ref = useRef<HTMLDivElement>(null)

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
			className="sticky left-0 z-1 grid min-w-max snap-start grid-rows-subgrid text-center backdrop-blur-sm"
			style={{ gridRow: `span ${stats.length + 1}` }}
		>
			<small className="text-foreground/50 m-auto grid leading-none">
				Week
				<span>{scoreboard.scoreboard.week}</span>
			</small>

			{stats.map(({ stat }) => (
				<small className="text-foreground/50 m-auto" key={stat.stat_id}>
					{stat.stat_id}
				</small>
			))}
		</div>
	)
}
