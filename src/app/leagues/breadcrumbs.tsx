import Link from 'next/link'
import css from './breadcrumbs.module.css'

export default function ({ children }: { children?: React.ReactNode }) {
	return (
		<nav className={css.root}>
			<ol className="gap-x-ch overflow-fade-r pr-ch flex snap-x snap-mandatory overflow-x-auto whitespace-nowrap *:snap-start *:transition-opacity">
				<li>
					{!children ? 'All Leagues' : <Link href="/leagues">All Leagues</Link>}
				</li>

				{children}
			</ol>
		</nav>
	)
}
