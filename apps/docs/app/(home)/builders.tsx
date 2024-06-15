import {
	MousePointerClickIcon,
	PanelTopDashedIcon,
	SquareMenuIcon,
	SquareSlashIcon,
} from 'lucide-react';
import { Card } from './card';
import { CodeBlock } from '@/components/code-block';
import Link from 'next/link';
import { cn } from '@/utils/cn';
import { SectionTitle, Separator } from './separator';
import {
	buttonCode,
	contextMenuCode,
	modalCode,
	selectMenuCode,
	signalCode,
	slashCommandCode,
} from './codes';
import Meteors from '@/components/meteors';
import { HorizontalSection } from './horizontal-card';

export function HomeBuilders() {
	return (
		<>
			<SectionTitle content="Application Commands" />

			<section className="flex w-full flex-col items-center divide-x-0 divide-y border border-t-0 lg:flex-row lg:divide-x lg:divide-y-0">
				<Card
					title="Slash Commands"
					description="Slash commands provide a structured and user-friendly way for users to interact with bots on Discord."
					link="/docs/commands/slash-commands"
					icon={<SquareSlashIcon className="size-4 md:size-5" />}
				>
					<CodeBlock lang="js" code={slashCommandCode} />
				</Card>
				<Card
					title="Context Menus"
					description="Context menu commands let users interact with bots via right-click options for quick access to functions."
					link="/docs/commands/context-menus"
					icon={<PanelTopDashedIcon className="size-4 md:size-5" />}
				>
					<CodeBlock lang="js" code={contextMenuCode} />
				</Card>
			</section>

			<Separator />

			<HorizontalSection
				title="Signals"
				description="Signals allow you to handle specific events or actions within your
				bot, enabling customized and responsive behavior."
				docsLink="/docs/signals"
				titleClass="text-4xl lg:text-5xl xl:text-6xl"
				otherLink={{
					name: 'Signals Enum ↗',
					link: '/docs/components/select-menus#selectmenuoptions',
					external: true,
				}}
				withMeteors
			>
				<CodeBlock
					lang="js"
					code={signalCode}
					wrapper={{ className: 'flex-grow mt-0' }}
				/>
			</HorizontalSection>

			<Separator />

			<SectionTitle content="Components" />

			<section className="flex w-full flex-col items-center divide-x-0 divide-y border border-t-0 lg:flex-row lg:divide-x lg:divide-y-0">
				<Card
					title="Buttons"
					description="Buttons provide interactive elements that users can click to trigger specific actions within your bot."
					link="/docs/components/buttons"
					icon={<MousePointerClickIcon className="size-4 md:size-5" />}
				>
					<CodeBlock lang="js" code={buttonCode} />
				</Card>
				<Card
					title="Modals"
					description="Modals are popup forms that collect detailed user input, ideal for complex interactions requiring multiple fields."
					link="/docs/components/modals"
					icon={<SquareMenuIcon className="size-4 md:size-5" />}
				>
					<CodeBlock lang="js" code={modalCode} />
				</Card>
			</section>

			<HorizontalSection
				title="Select Menus"
				description="Select menus allow users to choose from a list of options, perfect for forms and surveys requiring multiple choices."
				docsLink="/docs/components/select-menus"
				otherLink={{
					name: 'Select Types',
					link: '/docs/components/select-menus#selectmenuoptions',
				}}
			>
				<CodeBlock
					lang="js"
					code={selectMenuCode}
					wrapper={{ className: 'flex-grow mt-0' }}
				/>
			</HorizontalSection>
		</>
	);
}
