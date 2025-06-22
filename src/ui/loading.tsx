import { VscLoading } from 'react-icons/vsc'
import { cn } from '@/lib/utils'

export default function ({
	className,
	children,
}: React.ComponentProps<'aside'>) {
	return (
		<aside className={cn('gap-ch inline-flex items-center', className)}>
			<span className="size-lh grid place-items-center">
				<VscLoading className="animate-spin" />
			</span>
			{children || 'Loading...'}
		</aside>
	)
}
