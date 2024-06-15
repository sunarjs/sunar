import { type BaseLayoutProps } from 'fumadocs-ui/layout';

import { Logo } from '@/components/logo';
import { NPMIcon } from '@/icons/npm';
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
		{
			text: 'Package ↗',
			url: 'https://npmjs.com/package/sunar',
			icon: <NPMIcon className="size-4" />,
			active: 'url',
			external: true,
		},
	],
};
