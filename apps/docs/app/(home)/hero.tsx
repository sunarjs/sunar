import { CopyInstall } from '@/components/copy-install';
import { GridPattern } from '@/components/grid-pattern';
import { cn } from '@/utils/cn';
import Link from 'next/link';

export function HomeHero() {
	return (
		<section className="relative flex flex-col items-center justify-center border p-20 text-center">
			<GridPattern
				width={30}
				height={30}
				x={-1}
				y={-1}
				strokeDasharray={'4 2'}
				className={cn(
					'-z-20 [mask-image:radial-gradient(650px_circle_at_center,white,transparent)]'
				)}
			/>
			<h1
				className={cn(
					'mb-4 flex flex-col text-balance text-8xl font-extrabold tracking-tight',
					'[&>span]:dark:bg-gradient-to-t [&>span]:dark:from-muted-foreground [&>span]:dark:to-foreground',
					'[&>span]:dark:to-40% [&>span]:dark:bg-clip-text [&>span]:dark:text-transparent'
				)}
			>
				<span>Make Overpowered</span>
				<span>Discord Bots.</span>
			</h1>
			<p className="max-w-5xl text-balance text-3xl font-medium text-muted-foreground">
				Sunar emerges as a finely-tuned discord.js framework, meticulously
				engineered to prioritize{' '}
				<span className="text-secondary-foreground">
					ease of use and efficiency
				</span>
				.
			</p>
			<div className="mt-[35px] flex translate-x-[1.5px] space-x-4">
				<Link
					href="/docs"
					className={cn(
						'rounded-full border bg-foreground px-6 py-3 font-medium text-background transition-opacity hover:opacity-90 dark:font-semibold',
						'to-70% dark:bg-gradient-to-t dark:from-muted-foreground dark:to-foreground'
					)}
				>
					Getting started
				</Link>

				<CopyInstall />
			</div>
		</section>
	);
}
