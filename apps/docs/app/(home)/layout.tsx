import type { ReactNode } from 'react';
import { Layout } from 'fumadocs-ui/layout';

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
		<footer className="py-12 text-secondary-foreground">
			<div className="flex flex-col gap-4 px-4 sm:flex-row sm:items-end sm:justify-between">
				<div>
					<p className="mb-1 text-lg font-semibold">Sunar</p>
					<p className="text-muted-foreground">
						Built with love by{' '}
						<a
							href="https://github.com/taii03"
							rel="noreferrer noopener"
							target="_blank"
							className="font-medium transition-colors hover:text-foreground"
						>
							tai03 ↗
						</a>
					</p>
				</div>
				<a
					href="https://github.com/sunarjs/sunar/blob/main/LICENSE.md"
					className="text-muted-foreground transition-colors hover:text-foreground"
					rel="noopener noreferrer"
					target="_blank"
				>
					License ↗
				</a>
			</div>
		</footer>
	);
}
