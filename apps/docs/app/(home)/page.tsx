import { HomeHero } from '@/app/(home)/hero';
import { HomeBuilders } from '@/app/(home)/builders';
import { HomeHighlights } from './highlights';
import { Separator } from './separator';
import Link from 'next/link';
import { cn } from '@/utils/cn';
import { CopyInstall } from '@/components/copy-install';

export default function HomePage() {
	return (
		<main className="h-min-screen flex flex-col py-2">
			<HomeHero />

			<section className="flex h-72 w-full items-center justify-center border-x bg-gradient-to-b from-background to-muted/50">
				<h2 className="text-pretty text-center text-6xl font-bold dark:opacity-90 dark:drop-shadow-lg">
					Build your bot at
					<br />
					the speed of thought.
				</h2>
			</section>

			<HomeHighlights />

			<Separator />

			<HomeBuilders />

			<section className="flex h-60 w-full flex-col items-center justify-center gap-y-8 border-x border-b bg-gradient-to-b from-background to-muted/50">
				<h2 className="text-pretty text-6xl font-extrabold dark:drop-shadow-lg">
					Start creating your bot now.
				</h2>
				<div className="flex gap-x-4">
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
		</main>
	);
}
