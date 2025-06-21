import { VscLoading } from 'react-icons/vsc'
import { cn } from '@/lib/utils'

export default function ({
	className,
	children,
}: React.ComponentProps<'aside'>) {
	return (
		<aside className={cn('gap-ch inline-flex items-center', className)}>
			<VscLoading className="animate-spin" />
			{children || 'Loading...'}
		</aside>
	)
}
