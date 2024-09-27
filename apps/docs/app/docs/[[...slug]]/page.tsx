import { notFound } from 'next/navigation';
import {
	DocsBody,
	DocsCategory,
	DocsDescription,
	DocsPage,
	DocsTitle,
} from 'fumadocs-ui/page';

import { GitHubIcon } from '@/icons';
import { source } from '@/app/source';
import { createMetadata } from '@/utils/metadata';
import { mdxComponents } from '@/utils/mdx-components';

interface Params {
	slug: string[];
}

export const dynamicParams = false;

export default async function Page({ params }: { params: Params }) {
	const page = source.getPage(params.slug);

	if (page == null) notFound();

	const path = `apps/docs/content/docs/${page.file.path}`;

	const footer = (
		<a
			href={`https://github.com/sunarjs/sunar/blob/main/${path}`}
			target="_blank"
			rel="noreferrer noopener"
			className="flex items-center gap-x-2 text-stone-700 hover:text-stone-600 dark:text-stone-400 dark:hover:text-stone-300"
		>
			<GitHubIcon className="size-3" />
			<span className="text-xs">Edit on Github ↗</span>
		</a>
	);

	return (
		<DocsPage
			toc={page.data.toc}
			lastUpdate={page.data.lastModified}
			tableOfContent={{
				enabled: true,
				style: 'clerk',
				footer,
			}}
			tableOfContentPopover={{ footer }}
		>
			<DocsTitle>{page.data.title}</DocsTitle>
			<DocsDescription>{page.data.description}</DocsDescription>
			<DocsBody>
				<page.data.body components={mdxComponents} />
				{page.data.index ? (
					<DocsCategory page={page} pages={source.getPages()} />
				) : null}
			</DocsBody>
		</DocsPage>
	);
}

export function generateStaticParams(): Params[] {
	return source.generateParams();
}

export async function generateMetadata({ params }: { params: Params }) {
	const page = source.getPage(params.slug);

	if (page == null) notFound();

	const description =
		page.data.description ??
		'The library for building overpowered discord bots with discord.js.';

	const imageParams = new URLSearchParams();
	imageParams.set('title', page.data.title);
	imageParams.set('description', description);

	const image = {
		alt: 'Banner',
		url: `/api/og?${imageParams.toString()}`,
		width: 1200,
		height: 630,
	};

	return createMetadata({
		title: page.data.title,
		description,
		openGraph: {
			url: `/docs/${page.slugs.join('/')}`,
			images: image,
		},
		twitter: {
			images: image,
		},
	});
}
