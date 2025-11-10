import Link from "next/link";

import { BackgroundRipple } from "@/components/backgrounds/ripple-effect";
import { SunarIcon } from "@/components/icon";

import { buttonVariants } from "@/components/ui/button";

import { cn } from "@/utils/cn";

export function HomeCTASection() {
    return (
        <section className="group relative w-full overflow-hidden rounded-2xl border">
            <BackgroundRipple />
            <div className="flex flex-col items-center justify-center gap-y-6 py-15">
                <SunarIcon className="-z-30 -translate-x-1/2 -top-80 md:-top-132 absolute left-1/2 size-120 text-fd-accent md:size-180" />
                <h2 className="relative z-10 font-medium text-2xl text-shadow-lg tracking-tight md:text-4xl">
                    Start creating your bot now.
                </h2>
                <Link
                    href="/docs/getting-started"
                    className={cn(buttonVariants(), "relative z-10 rounded-xl bg-fd-foreground/90 hover:bg-fd-foreground/80")}
                >
                    Get Started
                </Link>
            </div>
        </section>
    );
}
