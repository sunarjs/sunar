import type { ReactNode } from 'react';
import { HomeLayout as Layout } from 'fumadocs-ui/home-layout';

import { baseOptions } from '@/app/layout.config';

export default function HomeLayout({
	children,
}: {
	children: ReactNode;
}): React.ReactElement {
	return (
		<div className="container">
			<Layout {...baseOptions}>
				{children}
				<Footer />
			</Layout>
		</div>
	);
}

function Footer(): React.ReactElement {
	return (
		<footer className="text-secondary-foreground py-12">
			<div className="flex flex-col gap-4 px-4 sm:flex-row sm:items-end sm:justify-between">
				<div>
					<p className="mb-1 text-lg font-semibold">Sunar</p>
					<p className="text-muted-foreground">
						Built with love by{' '}
						<a
							href="https://github.com/taii03"
							rel="noreferrer noopener"
							target="_blank"
							className="hover:text-foreground font-medium transition-colors"
						>
							tai03 ↗
						</a>
					</p>
				</div>
				<a
					href="https://github.com/sunarjs/sunar/blob/main/LICENSE.md"
					className="text-muted-foreground hover:text-foreground transition-colors"
					rel="noopener noreferrer"
					target="_blank"
				>
					License ↗
				</a>
			</div>
		</footer>
	);
}
