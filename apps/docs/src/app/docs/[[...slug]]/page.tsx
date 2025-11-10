import { createRelativeLink } from "fumadocs-ui/mdx";
import { DocsBody, DocsDescription, DocsPage, DocsTitle, EditOnGitHub } from "fumadocs-ui/page";
import { notFound } from "next/navigation";

import { baseOptions } from "@/app/layout.config";
import { source } from "@/app/source";

import { Feedback } from "@/components/feedback";
import { LLMCopyButton, ViewOptions } from "@/components/page-actions";
import { PageReferences } from "@/components/page-references";

import { getMDXComponents } from "@/mdx-components";
import { rateAction } from "@/utils/discord";
import { createMetadata } from "@/utils/metadata";

interface Params {
    slug: string[];
}

export const dynamicParams = false;

const DocsTocFooter = ({ path }: { path: string }) => (
    <EditOnGitHub
        href={`https://github.com/sunarjs/sunar/blob/main/apps/docs/content/docs/${path}`}
        target="_blank"
        rel="noreferrer noopener"
    />
);

export default async function Page(props: { params: Promise<{ slug?: string[] }> }) {
    const params = await props.params;
    const page = source.getPage(params.slug);

    if (!page) notFound();

    const MDXContent = page.data.body;

    return (
        <DocsPage
            toc={page.data.toc}
            lastUpdate={page.data.lastModified}
            tableOfContent={{
                style: "clerk",
                footer: <DocsTocFooter path={page.path} />,
            }}
            tableOfContentPopover={{ footer: <DocsTocFooter path={page.path} /> }}
            article={{ className: "shadow-none!" }}
        >
            <DocsTitle>{page.data.title}</DocsTitle>
            <DocsDescription className="mb-4">{page.data.description}</DocsDescription>
            <div className="mb-4 flex flex-row items-center gap-2 border-b pb-6">
                <LLMCopyButton markdownUrl={`${page.url}.mdx`} />
                <ViewOptions
                    markdownUrl={`${page.url}.mdx`}
                    githubUrl={`${baseOptions.githubUrl}/blob/dev/apps/docs/content/docs/${page.path}`}
                />
                <div className="ms-auto">
                    <PageReferences data={page.data.references} />
                </div>
            </div>
            <DocsBody>
                <MDXContent components={getMDXComponents({ a: createRelativeLink(source, page) })} />
            </DocsBody>
            <Feedback onRateAction={rateAction} />
        </DocsPage>
    );
}

export async function generateMetadata({ params }: { params: Promise<{ slug?: string[] }> }) {
    const { slug = [] } = await params;
    const page = source.getPage(slug);
    if (!page) notFound();

    const image = ["/docs-og", ...slug, "image.png"].join("/");
    return createMetadata({
        title: page.data.title,
        description: page.data.description,
        openGraph: {
            images: image,
        },
        twitter: {
            card: "summary_large_image",
            images: image,
        },
    });
}

export function generateStaticParams(): Params[] {
    return source.generateParams();
}
