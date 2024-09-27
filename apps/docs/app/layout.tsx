import '@/app/global.css';

import type { ReactNode } from 'react';
import { GeistSans } from 'geist/font/sans';
import { GeistMono } from 'geist/font/mono';
import { RootProvider } from 'fumadocs-ui/provider';
import { Analytics } from '@vercel/analytics/react';

import { cn } from '@/utils/cn';
import { baseUrl, createMetadata } from '@/utils/metadata';

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
				<Analytics />
			</body>
		</html>
	);
}
