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
				'rounded-full border bg-foreground px-6 py-2 text-sm font-medium text-background transition-opacity hover:opacity-90 dark:font-semibold sm:text-base md:py-3',
				'to-70% dark:bg-gradient-to-t dark:from-muted-foreground dark:to-foreground',
				props?.className,
			)}
		/>
	);
}
