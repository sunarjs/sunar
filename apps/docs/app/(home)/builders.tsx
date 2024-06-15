import {
	MousePointerClickIcon,
	PanelTopDashedIcon,
	SquareMenuIcon,
	SquareSlashIcon,
} from 'lucide-react';
import {
	Lumiflex,
	Novatrix,
	Opulento,
	Tranquiluxe,
	Velustro,
	Zenitho,
} from 'uvcanvas';
import { Card } from './card';
import { CodeBlock, PrettyCodeBlock } from '@/components/code-block';
import Link from 'next/link';
import { cn } from '@/utils/cn';
import { Separator } from './separator';
import {
	buttonCode,
	contextMenuCode,
	modalCode,
	selectMenuCode,
	signalCode,
	slashCommandCode,
} from './codes';
import Meteors from '@/components/meteors';

export function HomeBuilders() {
	return (
		<>
			<section className="relative flex h-36 w-full items-center justify-around overflow-hidden border border-t-0 bg-gradient-to-b dark:from-muted/50 dark:to-background dark:to-60%">
				<h2 className="z-10 text-6xl font-bold">Application Commands</h2>
			</section>

			<section className="flex w-full items-center divide-x border border-t-0">
				<Card
					title="Slash Commands"
					description="Slash commands provide a structured and user-friendly way for users to interact with bots on Discord."
					link="/docs/commands/slash-commands"
					icon={SquareSlashIcon}
				>
					<PrettyCodeBlock
						lang="js"
						code={slashCommandCode}
						background={<Tranquiluxe />}
					/>
				</Card>
				<Card
					title="Context Menus"
					description="Context menu commands let users interact with bots via right-click options for quick access to functions."
					link="/docs/commands/context-menus"
					icon={PanelTopDashedIcon}
				>
					<PrettyCodeBlock
						lang="js"
						code={contextMenuCode}
						background={<Velustro />}
					/>
				</Card>
			</section>

			<Separator />

			<section className="relative flex w-full items-center justify-between overflow-hidden border border-t-0 px-8 py-4">
				<Meteors number={20} />

				<div className="flex w-fit flex-col gap-y-4">
					<h2 className="text-6xl font-bold">Signals</h2>
					<p className="max-w-xl text-pretty text-xl font-medium text-muted-foreground">
						Signals allow you to handle specific events or actions within your
						bot, enabling customized and responsive behavior.
					</p>
					<div className="mt-2 flex gap-x-4">
						<Link
							href="/docs/signals"
							className={cn(
								'rounded-full border bg-foreground px-5 py-2 font-medium text-background transition-opacity hover:opacity-80 dark:font-semibold',
								'to-70% dark:bg-gradient-to-t dark:from-muted-foreground dark:to-foreground'
							)}
						>
							Read more
						</Link>
						<a
							href="https://discord.js.org/docs/packages/discord.js/main/Events:Enum"
							className="w-fit rounded-full bg-muted px-5 py-2 font-medium transition-colors hover:bg-secondary"
						>
							Signals Enum ↗
						</a>
					</div>
				</div>

				<CodeBlock
					lang="js"
					code={signalCode}
					wrapper={{
						className: 'bg-muted w-[593px]',
						allowCopy: false,
					}}
				/>
			</section>

			<Separator />

			<section className="relative flex h-36 w-full items-center justify-around overflow-hidden border border-t-0 bg-gradient-to-b dark:from-muted/50 dark:to-background dark:to-60%">
				<h2 className="z-10 text-6xl font-bold">Components</h2>
			</section>

			<section className="flex w-full items-center divide-x border border-t-0">
				<Card
					title="Buttons"
					description="Buttons provide interactive elements that users can click to trigger specific actions within your bot."
					link="/docs/components/buttons"
					icon={MousePointerClickIcon}
				>
					<PrettyCodeBlock
						lang="js"
						code={buttonCode}
						background={<Novatrix />}
						container={{ className: 'h-64' }}
					/>
				</Card>
				<Card
					title="Modals"
					description="Modals are popup forms that collect detailed user input, ideal for complex interactions requiring multiple fields."
					link="/docs/components/modals"
					icon={SquareMenuIcon}
				>
					<PrettyCodeBlock
						lang="js"
						code={modalCode}
						background={<Zenitho />}
						container={{ className: 'h-64' }}
					/>
				</Card>
			</section>

			<section className="flex w-full items-center justify-between border border-t-0 p-8">
				<div className="flex w-fit flex-col gap-y-4">
					<h2 className="text-6xl font-bold">Select Menus</h2>
					<p className="max-w-xl text-pretty text-xl font-medium text-muted-foreground">
						Select menus allow users to choose from a list of options, perfect
						for forms and surveys requiring multiple choices.
					</p>
					<div className="mt-2 flex gap-x-4">
						<Link
							href="/docs/components/select-menus"
							className={cn(
								'rounded-full border bg-foreground px-5 py-2 font-medium text-background transition-opacity hover:opacity-80 dark:font-semibold',
								'to-70% dark:bg-gradient-to-t dark:from-muted-foreground dark:to-foreground'
							)}
						>
							Read more
						</Link>
						<Link
							href="/docs/components/select-menus#selectmenuoptions"
							className="w-fit rounded-full bg-muted px-5 py-2 font-medium transition-colors hover:bg-secondary"
						>
							Select Types
						</Link>
					</div>
				</div>
				<PrettyCodeBlock
					lang="js"
					code={selectMenuCode}
					background={<Opulento />}
				/>
			</section>
		</>
	);
}
