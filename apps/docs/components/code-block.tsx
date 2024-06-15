import { cn } from '@/utils/cn';
import * as Base from 'fumadocs-ui/components/codeblock';
import type { HTMLAttributes } from 'react';
import { useMemo } from 'react';
import {
	BundledLanguage,
	LanguageInput,
	SpecialLanguage,
	StringLiteralUnion,
	getHighlighter,
} from 'shiki';

const langs = ['js'] satisfies (
	| LanguageInput
	| SpecialLanguage
	| StringLiteralUnion<BundledLanguage, string>
)[];

const highlighter = await getHighlighter({
	langs,
	themes: ['min-light', 'github-dark-default'],
});

export type CodeBlockProps = HTMLAttributes<HTMLPreElement> & {
	code: string;
	wrapper?: Base.CodeBlockProps;
	lang: (typeof langs)[number];
};

export function CodeBlock({
	code,
	lang,
	wrapper,
	...props
}: CodeBlockProps): React.ReactElement {
	const html = useMemo(
		() =>
			highlighter.codeToHtml(code, {
				lang,
				defaultColor: false,
				themes: {
					light: 'min-light',
					dark: 'github-dark-default',
				},
				transformers: [
					{
						name: 'remove-pre',
						root: (root) => {
							if (root.children[0].type !== 'element') return;

							return {
								type: 'root',
								children: root.children[0].children,
							};
						},
					},
				],
			}),
		[code, lang]
	);

	return (
		<Base.CodeBlock {...wrapper}>
			<Base.Pre {...props} dangerouslySetInnerHTML={{ __html: html }} />
		</Base.CodeBlock>
	);
}

interface PrettyCodeBlockOptions extends CodeBlockProps {
	background: React.ReactNode;
	container?: React.DetailedHTMLProps<
		React.HTMLAttributes<HTMLDivElement>,
		HTMLDivElement
	>;
}

export function PrettyCodeBlock({
	background,
	container,
	...props
}: PrettyCodeBlockOptions) {
	return (
		<div
			{...container}
			className={cn(
				'relative flex h-80 w-[593px] overflow-hidden rounded-lg',
				container?.className
			)}
		>
			{background}
			<CodeBlock
				{...props}
				wrapper={{
					allowCopy: false,
					className:
						'bg-muted/50 dark:bg-muted/60 absolute mx-auto top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 my-auto w-11/12 backdrop-blur-xl border-none',
					...props.wrapper,
				}}
			/>
		</div>
	);
}
