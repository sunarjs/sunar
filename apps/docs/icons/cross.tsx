import { cn } from '@/utils/cn';

export function Cross({
	className,
	...props
}: React.DetailedHTMLProps<
	React.HTMLAttributes<HTMLDivElement>,
	HTMLDivElement
>) {
	return (
		<div {...props} className={cn('relative z-10', className)}>
			<div className="bg-muted-foreground h-[15px] w-[1px]" />
			<div className="bg-muted-foreground absolute inset-0 h-[15px] w-[1px] rotate-90" />
		</div>
	);
}
