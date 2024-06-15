import { Cross } from '@/icons/cross';
import {
	FolderTreeIcon,
	GlobeIcon,
	LucideIcon,
	MousePointerClickIcon,
	RabbitIcon,
	ScaleIcon,
	TypeIcon,
} from 'lucide-react';

export function HomeHighlights() {
	return (
		<div className="grid w-full grid-cols-3 border-b border-r bg-gradient-to-b from-muted/40 to-transparent to-50%">
			<div className="relative">
				<Highlight title="Easy-to-Use" icon={MousePointerClickIcon}>
					Offers a simple and readable API, making Discord bot development
					straightforward for all users.
				</Highlight>
				<Cross className="absolute -bottom-2 -right-[1px]" />
			</div>
			<div className="relative">
				<Highlight title="Developer Experience" icon={TypeIcon}>
					Provides robust type definitions, ensuring developers in JavaScript
					and TypeScript enjoy a seamless experience.
				</Highlight>
				<Cross className="absolute -bottom-2 -right-[1px]" />
			</div>
			<Highlight title="Lightweight" icon={ScaleIcon}>
				Prioritizes efficiency and performance while delivering essential
				Discord bot functionalities.
			</Highlight>
			<Highlight title="Fast" icon={RabbitIcon}>
				Supports essential features like slash commands, context menu commands,
				and more for dynamic bot interactions.
			</Highlight>
			<Highlight title="Open Source" icon={GlobeIcon}>
				Sunar is open-source, allowing community contributions and customization
				to meet diverse bot development needs.
			</Highlight>
			<Highlight title="Structured Code" icon={FolderTreeIcon}>
				Encourages clean and organized project architecture for easier
				maintenance and scalability.
			</Highlight>
		</div>
	);
}

interface HighlightPros extends React.PropsWithChildren {
	title: string;
	icon: LucideIcon;
}

export function Highlight({ icon: IconComp, title, children }: HighlightPros) {
	return (
		<div className="h-full border-l border-t p-8">
			<div className="mb-4 flex flex-row items-center gap-2 text-muted-foreground">
				<IconComp className="size-4" />
				<h2 className="text-sm font-medium">{title}</h2>
			</div>
			<p className="text-pretty">{children}</p>
		</div>
	);
}
