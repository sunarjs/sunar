import { cn } from '@/utils/cn';

export interface ButtonProps
	extends React.DetailedHTMLProps<
		React.HTMLAttributes<HTMLButtonElement>,
		HTMLButtonElement
	> {}

export function Button(props?: ButtonProps) {
	return (
		<button
			{...props}
			className={cn(
				'bg-foreground text-background rounded-full border px-6 py-2 text-sm font-medium transition-opacity hover:opacity-90 dark:font-semibold sm:text-base md:py-3',
				'dark:from-muted-foreground dark:to-foreground to-70% dark:bg-gradient-to-t',
				props?.className,
			)}
		/>
	);
}
