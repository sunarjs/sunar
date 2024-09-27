import { DiscordIcon, GitHubIcon, DiscordJSIcon } from '@/icons';
import { PropsWithChildren } from 'react';

type LinkIcon = 'github' | 'discordjs' | 'discord';

interface LinkItem {
	icon: LinkIcon;
	link: string;
	label: string;
}

const Icons: Record<LinkIcon, React.ReactNode> = {
	discord: <DiscordIcon className="size-[18px]" />,
	discordjs: <DiscordJSIcon className="size-[18px] rounded" />,
	github: <GitHubIcon className="size-[18px] text-black dark:text-current" />,
};

export function Links({ children }: PropsWithChildren<LinkItem[]>) {
	return <div className="mt-4 flex flex-wrap gap-2">{children}</div>;
}

export function Link({ label, link, icon }: LinkItem) {
	return (
		<a
			href={link}
			target="_blank"
			rel="noopener noreferrer"
			className="bg-muted flex items-center gap-x-2 rounded-lg px-3 py-1.5 text-sm no-underline"
		>
			{Icons[icon]}
			{label}
		</a>
	);
}
