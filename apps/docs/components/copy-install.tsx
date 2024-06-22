'use client';

import { cn } from '@/utils/cn';
import { CheckIcon, CopyIcon, TerminalIcon } from 'lucide-react';
import { useState } from 'react';

const content = 'npm install sunar';

export function CopyInstall(
	props: React.DetailedHTMLProps<
		React.HTMLAttributes<HTMLButtonElement>,
		HTMLButtonElement
	>,
) {
	const [copied, setCopied] = useState(false);

	const handleClick = async () => {
		try {
			await navigator.clipboard.writeText(content);

			setCopied(true);

			setTimeout(() => {
				setCopied(false);
			}, 3000);
		} catch (error) {
			setCopied(false);
			console.error(error);
		}
	};

	return (
		<button
			onClick={handleClick}
			{...props}
			className={cn(
				'flex items-center gap-x-3 rounded-full border bg-secondary px-6 py-2 text-start outline-none transition-colors hover:bg-white dark:bg-muted dark:hover:bg-secondary md:py-3',
				props.className,
			)}
		>
			<TerminalIcon className="hidden size-4 sm:block md:size-5" />
			<span className="font-mono text-sm font-medium sm:text-base">
				{content}
			</span>
			<div className="relative pl-1 text-muted-foreground">
				<CopyIcon
					className={cn(
						'size-3 opacity-100 transition-opacity md:size-4',
						copied && 'opacity-0',
					)}
				/>
				<CheckIcon
					className={cn(
						'absolute inset-0 size-3 opacity-0 transition-opacity md:size-4',
						copied && 'opacity-100',
					)}
				/>
			</div>
		</button>
	);
}
