import Link from 'next/link';

import { HomeHero } from '@/app/(home)/hero';
import { HomeBuilders } from '@/app/(home)/builders';

import { HomeHighlights } from './highlights';
import { Separator } from './separator';

import { CopyInstall } from '@/components/copy-install';
import { Button } from '@/components/ui/button';

export default function HomePage() {
	return (
		<main className="h-min-screen flex flex-col py-2">
			<HomeHero />

			<section className="from-background to-muted/50 flex w-full items-center justify-center border-x bg-gradient-to-b px-2 py-12 md:px-0 md:py-16 lg:py-20">
				<h2 className="text-pretty text-center text-2xl font-bold dark:opacity-90 dark:drop-shadow-lg sm:text-4xl md:text-5xl lg:text-6xl">
					Build your bot at
					<br />
					the speed of thought.
				</h2>
			</section>

			<HomeHighlights />

			<Separator />

			<HomeBuilders />

			<section className="from-background to-muted/50 flex w-full flex-col items-center justify-center gap-y-4 border-x border-b bg-gradient-to-b px-4 py-8 sm:gap-y-8 sm:px-0 md:py-12 lg:py-16">
				<h2 className="text-pretty text-center text-2xl font-extrabold dark:drop-shadow-lg sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl">
					Start creating your bot now.
				</h2>
				<div className="flex flex-row gap-x-2">
					<Link href="/docs">
						<Button>Read the docs</Button>
					</Link>

					<CopyInstall className="hidden sm:flex" />
				</div>
			</section>
		</main>
	);
}
