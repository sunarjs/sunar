import type { B as BaseLayoutProps } from 'fumadocs-ui/dist/layout.shared-DEQFTB9M';

import { Logo } from '@/components/logo';
import { SunarIcon } from '@/components/icon';

export const baseOptions: BaseLayoutProps = {
	githubUrl: 'https://github.com/sunarjs/sunar',
	nav: {
		title: <Logo className="size-6" />,
		transparentMode: 'top',
	},
	links: [
		{
			text: 'Documentation',
			icon: <SunarIcon className="size-4" />,
			url: '/docs',
			active: 'nested-url',
		},
	],
};
