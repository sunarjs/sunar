import '@/app/global.css';

import { RootProvider } from 'fumadocs-ui/provider';
import type { ReactNode } from 'react';

import { baseUrl, createMetadata } from '@/utils/metadata';
import { GeistSans } from 'geist/font/sans';
import { GeistMono } from 'geist/font/mono';
import { cn } from '@/utils/cn';

export const metadata = createMetadata({
	title: {
		template: '%s | Sunar',
		default: 'Sunar',
	},
	description: 'The discord.js framework for building discord bots.',
	metadataBase: baseUrl,
});

export default function Layout({ children }: { children: ReactNode }) {
	return (
		<html
			lang="en"
			className={cn('font-sans', GeistSans.variable, GeistMono.variable)}
			suppressHydrationWarning
		>
			<body>
				<RootProvider>{children}</RootProvider>
			</body>
		</html>
	);
}
