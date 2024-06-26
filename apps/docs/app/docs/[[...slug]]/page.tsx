import { GitHubIcon } from '@/icons';
import { createMetadata } from '@/utils/metadata';
import { getPage, getPages } from '@/utils/source';
import { DocsBody, DocsPage } from 'fumadocs-ui/page';
import { notFound } from 'next/navigation';
import { RollButton } from 'fumadocs-ui/components/roll-button';

interface Params {
	slug: string[];
}

export const dynamicParams = false;

export default function Page({ params }: { params: Params }) {
	const page = getPage(params.slug);

	if (page == null) {
		notFound();
	}

	const MDX = page.data.exports.default;
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
			toc={page.data.exports.toc}
			lastUpdate={page.data.exports.lastModified}
			tableOfContent={{
				enabled: true,
				footer,
			}}
			tableOfContentPopover={{ footer }}
		>
			<RollButton />
			<DocsBody>
				<h1>{page.data.title}</h1>
				<MDX />
			</DocsBody>
		</DocsPage>
	);
}

export function generateStaticParams(): Params[] {
	return getPages().map<Params>((page) => ({
		slug: page.slugs,
	}));
}

export function generateMetadata({ params }: { params: { slug?: string[] } }) {
	const page = getPage(params.slug);

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
