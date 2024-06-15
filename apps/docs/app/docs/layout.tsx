import { DocsLayout } from 'fumadocs-ui/layout';
import type { ReactNode } from 'react';

import { pageTree } from '@/utils/source';
import { baseOptions } from '@/app/layout.config';

export default function Layout({ children }: { children: ReactNode }) {
	return (
		<DocsLayout tree={pageTree} {...baseOptions}>
			{children}
		</DocsLayout>
	);
}
