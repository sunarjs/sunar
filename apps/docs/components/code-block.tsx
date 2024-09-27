import { cn } from '@/utils/cn';
import * as Base from 'fumadocs-ui/components/codeblock';
import { Jsx, toJsxRuntime } from 'hast-util-to-jsx-runtime';
import { Fragment, type HTMLAttributes } from 'react';
import {
	BundledLanguage,
	LanguageInput,
	SpecialLanguage,
	StringLiteralUnion,
	codeToHast,
} from 'shiki';
import { jsx, jsxs } from 'react/jsx-runtime';

const langs = ['js'] satisfies (
	| LanguageInput
	| SpecialLanguage
	| StringLiteralUnion<BundledLanguage, string>
)[];

export type CodeBlockProps = HTMLAttributes<HTMLPreElement> & {
	code: string;
	wrapper?: Base.CodeBlockProps;
	lang: (typeof langs)[number];
};

export async function CodeBlock({
	code,
	lang,
	wrapper,
	...props
}: CodeBlockProps) {
	const hast = await codeToHast(code, {
		lang,
		defaultColor: false,
		themes: {
			light: 'min-light',
			dark: 'github-dark-default',
		},
	});

	const rendered = toJsxRuntime(hast, {
		jsx: jsx as Jsx,
		jsxs: jsxs as Jsx,
		Fragment,
		development: false,
		components: {
			// @ts-expect-error -- JSX component
			pre: Base.Pre,
		},
	});

	return (
		<Base.CodeBlock
			allowCopy={false}
			{...wrapper}
			className={cn('bg-muted/50 m-0 mt-2', wrapper?.className)}
		>
			{rendered}
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
				'relative flex h-80 overflow-hidden rounded-lg sm:w-full xl:w-[593px] [&>div>canvas]:hidden [&>div>canvas]:sm:block',
				container?.className,
			)}
		>
			{background}
			<CodeBlock
				{...props}
				wrapper={{
					allowCopy: false,
					className:
						'bg-muted/50 dark:bg-muted/60 absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 m-auto w-11/12 backdrop-blur-xl border-none',
					...props.wrapper,
				}}
			/>
		</div>
	);
}
