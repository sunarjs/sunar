import { LucideIcon } from 'lucide-react';
import Link from 'next/link';
import { PropsWithChildren } from 'react';

interface CardProps extends PropsWithChildren {
	title: string;
	description: React.ReactNode;
	icon: LucideIcon;
	link?: string;
}

export function Card({
	icon: IconComp,
	title,
	description,
	link,
	children,
}: CardProps) {
	return (
		<article className="flex w-full flex-col justify-center p-8">
			<header className="flex items-center justify-between">
				<div className="flex items-center gap-x-4">
					<div className="rounded-lg border bg-gradient-to-t from-background to-muted p-2 text-secondary-foreground dark:text-secondary-foreground/60">
						<IconComp className="size-5" />
					</div>
					<h3 className="text-2xl font-semibold">{title}</h3>
				</div>
				{link && (
					<Link
						href={link}
						className="mr-1 text-3xl font-light text-muted-foreground transition-colors hover:text-foreground"
					>
						↗
					</Link>
				)}
			</header>
			<main>
				<p className="my-4 text-pretty text-lg text-muted-foreground">
					{description}
				</p>
				{children}
			</main>
		</article>
	);
}
