import { DocsLayout } from 'fumadocs-ui/layout';
import type { ReactNode } from 'react';

import { source } from '@/app/source';
import { baseOptions } from '@/app/layout.config';

export default function Layout({ children }: { children: ReactNode }) {
	return (
		<DocsLayout
			sidebar={{ defaultOpenLevel: 0 }}
			tree={source.pageTree}
			{...baseOptions}
		>
			{children}
		</DocsLayout>
	);
}
