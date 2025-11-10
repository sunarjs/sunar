import Image from "next/image";

import { AnimatedList } from "@/components/animated-list";
import { BentoCard, type BentoCardProps, BentoGrid } from "@/components/bento-grid";

import { cn } from "@/utils/cn";

const cards: BentoCardProps[] = [
    {
        name: "Application Commands",
        description: "Offer an organized and intuitive way for users to interact with bots through slash commands and context menus.",
        href: "/docs/guides/registering-commands",
        cta: "Learn More",
        className: "col-span-3 bg-fd-muted-foreground/5",
        background: (
            <div className="absolute top-0 scale-200 transition-all duration-200 ease-in-out [--duration:20s] [mask-image:linear-gradient(to_top,transparent_10%,#000_100%)] group-hover:scale-[103%] md:scale-106 dark:top-2 dark:md:scale-111">
                <Image
                    src="https://discord.com/assets/dbe5e2df368cca02.webp"
                    alt="Application Commands"
                    className="transition-opacity duration-200 group-hover:opacity-100 dark:opacity-75 dark:group-hover:opacity-75"
                    width={3163}
                    height={811}
                />
            </div>
        ),
    },
    {
        name: "Signals",
        description: "Handle events to enable responsive bot behavior in real time.",
        href: "/docs/guides/working-with-signals",
        cta: "Learn More",
        className: "col-span-3 md:col-span-1",
        background: <SignalsAnimatedList />,
    },
    {
        name: "Components",
        description: "Interactive elements including buttons, select menus, and modals for richer bot interactions.",
        href: "/docs/guides/using-components",
        cta: "Learn More",
        className: "col-span-3 md:col-span-2 bg-fd-muted-foreground/5",
        background: (
            <div className="absolute scale-200 transition-all duration-200 ease-in-out [--duration:20s] [mask-image:linear-gradient(to_top,transparent_10%,#000_90%)] group-hover:scale-[150%] dark:bg-transparent">
                <Image
                    src="https://discord.com/assets/b43a0de66e70d08e.webp"
                    alt="Components"
                    className="transition-opacity duration-200 group-hover:opacity-80 dark:opacity-75"
                    width={4863}
                    height={1348}
                />
            </div>
        ),
    },
];

export function HomeBentoSection() {
    return (
        <section className="space-y-4">
            <BentoGrid>
                {cards.map((card) => (
                    <BentoCard key={card.name} {...card} />
                ))}
            </BentoGrid>
        </section>
    );
}

interface EventItem {
    name: string;
    description: string;
    icon: string;
    color: string;
}

let events: EventItem[] = [
    {
        name: "Ready",
        description: "The bot is ready to serve",
        icon: "🤖",
        color: "#FFB800",
    },
    {
        name: "Guild Member Add",
        description: "New member joined the guild",
        icon: "📥",
        color: "#00C9A7",
    },
    {
        name: "Message Delete",
        description: "A message was deleted",
        icon: "💬",
        color: "#FF3D71",
    },
    {
        name: "Message Reaction Add",
        description: "A reaction was added to a message",
        icon: "👍",
        color: "#1E86FF",
    },
    {
        name: "Message Reaction Removed",
        description: "A reaction was removed from a message",
        icon: "👎",
        color: "#FF3D71",
    },
    {
        name: "Guild Member Remove",
        description: "A member left the guild",
        icon: "📤",
        color: "#FF3D71",
    },
    {
        name: "Guild Member Update",
        description: "A member's information was updated",
        icon: "📝",
        color: "#00C9A7",
    },
    {
        name: "Guild Member Ban",
        description: "A member was banned from the guild",
        icon: "🚫",
        color: "#FFB800",
    },
];

events = Array.from({ length: 10 }, () => events).flat();

function Event({ name, description, icon, color }: EventItem) {
    return (
        <figure
            className={cn(
                "relative mx-auto min-h-fit w-full max-w-[400px] cursor-pointer overflow-hidden rounded-2xl p-4 group-hover:opacity-100 dark:opacity-70",
                // animation styles
                "transition-all duration-200 ease-in-out hover:scale-[103%]",
                // light styles
                "bg-white [box-shadow:0_0_0_1px_rgba(0,0,0,.03),0_2px_4px_rgba(0,0,0,.05),0_12px_24px_rgba(0,0,0,.05)]",
                // dark styles
                "transform-gpu dark:bg-transparent dark:backdrop-blur-md dark:[border:1px_solid_rgba(255,255,255,.1)] dark:[box-shadow:0_-20px_80px_-20px_#ffffff1f_inset]",
            )}
        >
            <div className="flex flex-row items-center gap-3">
                <div
                    className="flex size-10 items-center justify-center rounded-xl"
                    style={{
                        backgroundColor: `${color}60`,
                    }}
                >
                    <span className="text-lg">{icon}</span>
                </div>
                <div className="flex flex-col overflow-hidden">
                    <figcaption className="flex flex-row items-center whitespace-pre font-medium text-lg dark:text-white">
                        <span className="text-sm sm:text-lg">{name}</span>
                    </figcaption>
                    <p className="font-normal text-sm dark:text-white/60">{description}</p>
                </div>
            </div>
        </figure>
    );
}

function SignalsAnimatedList() {
    return (
        <div className="absolute top-0 left-0 flex h-[300px] w-full scale-95 flex-col overflow-hidden border-none p-2 transition-all duration-300 ease-out [mask-image:linear-gradient(to_top,transparent_10%,#000_100%)] group-hover:scale-90 md:scale-80">
            <AnimatedList delay={2000}>
                {events.map((item, index) => (
                    <Event {...item} key={`${item.name}-${index}`} />
                ))}
            </AnimatedList>
            <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/4 bg-gradient-to-t from-background" />
        </div>
    );
}
