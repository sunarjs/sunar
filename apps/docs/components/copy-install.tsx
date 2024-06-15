'use client';

import { cn } from '@/utils/cn';
import { CheckIcon, CopyIcon, TerminalIcon } from 'lucide-react';
import { useState } from 'react';

const content = 'npm install sunar';

export function CopyInstall() {
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
			className="flex items-center gap-x-3 rounded-full border bg-secondary px-6 py-3 text-start font-mono font-medium outline-none transition-colors hover:bg-white dark:bg-muted dark:hover:bg-secondary"
		>
			<TerminalIcon className="size-5" />
			{content}
			<div className="relative pl-1 text-muted-foreground">
				<CopyIcon
					className={cn(
						'size-4 opacity-100 transition-opacity',
						copied && 'opacity-0'
					)}
				/>
				<CheckIcon
					className={cn(
						'absolute inset-0 size-4 opacity-0 transition-opacity',
						copied && 'opacity-100'
					)}
				/>
			</div>
		</button>
	);
}
