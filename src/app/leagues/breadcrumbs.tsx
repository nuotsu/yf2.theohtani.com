import Link from 'next/link'
import { cn } from '@/lib/utils'
import css from './breadcrumbs.module.css'

export default function ({ className, children }: React.ComponentProps<'ol'>) {
	return (
		<nav className={css.root}>
			<ol
				className={cn(
					'gap-x-ch overflow-fade-r pr-ch flex snap-x snap-mandatory overflow-x-auto whitespace-nowrap *:snap-start *:transition-opacity *:not-only:last:font-bold',
					className,
				)}
			>
				<li>
					{!children ? 'All Leagues' : <Link href="/leagues">All Leagues</Link>}
				</li>

				{children}
			</ol>
		</nav>
	)
}
