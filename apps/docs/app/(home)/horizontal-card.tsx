import Link from 'next/link';
import type { PropsWithChildren } from 'react';

import Meteors from '@/components/meteors';
import { cn } from '@/utils/cn';

interface HorizontalSectionProps extends PropsWithChildren {
	title: string;
	description: React.ReactNode;
	docsLink: string;
	otherLink?: { name: string; link: string; external?: boolean };
	withMeteors?: boolean;
	titleClass?: string;
}

export function HorizontalSection({
	title,
	description,
	docsLink,
	otherLink,
	withMeteors,
	titleClass,
	children,
}: HorizontalSectionProps) {
	return (
		<section
			className={cn(
				'flex w-full flex-col gap-x-6 gap-y-4 border border-t-0 p-4 sm:p-6 lg:flex-row lg:items-center lg:justify-around xl:p-8',
				withMeteors && 'relative overflow-hidden',
			)}
		>
			{withMeteors && <Meteors number={20} />}
			<div className="flex h-full flex-col gap-y-2 xl:gap-y-4">
				<h2
					className={cn(
						'text-2xl font-bold sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl',
						titleClass,
					)}
				>
					{title}
				</h2>
				<p className="max-w-xl text-pretty text-sm font-medium text-muted-foreground sm:text-base md:text-lg xl:text-xl">
					{description}
				</p>
				<div className="mt-1 flex flex-wrap gap-x-1.5 gap-y-1.5 sm:gap-x-2 md:mt-2 md:gap-x-4">
					<Link
						href={docsLink}
						className={cn(
							'rounded-full border bg-foreground px-4 py-1 text-sm font-medium text-background transition-opacity hover:opacity-80 dark:font-semibold md:px-5 md:py-2 md:text-base',
							'to-70% dark:bg-gradient-to-t dark:from-muted-foreground dark:to-foreground',
						)}
					>
						Read more
					</Link>
					{otherLink && (
						<Link
							href={otherLink.link}
							rel="noopener noreferrer"
							target={otherLink.external ? '_blank' : undefined}
							className="w-fit rounded-full bg-muted px-4 py-1 text-sm font-medium transition-colors hover:bg-secondary md:px-5 md:py-2 md:text-base"
						>
							{otherLink.name}
						</Link>
					)}
				</div>
			</div>
			{children}
		</section>
	);
}
