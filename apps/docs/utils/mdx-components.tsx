import type { MDXComponents } from 'mdx/types';
import defaultComponents from 'fumadocs-ui/mdx';

import { Callout } from 'fumadocs-ui/components/callout';
import { Tab, Tabs } from 'fumadocs-ui/components/tabs';
import { TypeTable } from 'fumadocs-ui/components/type-table';
import { Steps, Step } from 'fumadocs-ui/components/steps';
import { File, Folder, Files } from 'fumadocs-ui/components/files';

import { Links, Link } from '@/components/ui/links';

export const mdxComponents: MDXComponents = {
	...defaultComponents,
	Tabs,
	Tab,
	Callout,
	TypeTable,
	Step,
	Steps,
	Files,
	Folder,
	File,
	Links,
	Link,
	InstallTabs: ({
		items,
		children,
	}: {
		items: string[];
		children: React.ReactNode;
	}) => (
		<Tabs items={items} groupId="package-manager">
			{children}
		</Tabs>
	),
	LanguageTabs: ({ children }: { children: React.ReactNode }) => (
		<Tabs items={['JavaScript', 'TypeScript']} groupId="language" persist>
			{children}
		</Tabs>
	),
};
