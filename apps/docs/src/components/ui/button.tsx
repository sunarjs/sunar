import { cva, type VariantProps } from "class-variance-authority";
import type * as React from "react";

import { Slot } from "@radix-ui/react-slot";

import { cn } from "@/utils/cn";

const buttonVariants = cva(
    "inline-flex shrink-0 items-center justify-center gap-2 whitespace-nowrap rounded-md font-medium text-sm outline-none transition-all focus-visible:border-fd-ring focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-fd-ring/50 disabled:pointer-events-none disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 [&_svg:not([class*='size-'])]:size-4 [&_svg]:pointer-events-none [&_svg]:shrink-0",
    {
        variants: {
            variant: {
                default: "bg-fd-primary text-fd-primary-foreground hover:bg-fd-primary/90",
                destructive:
                    "bg-fd-destructive text-white hover:bg-fd-destructive/90 focus-visible:ring-fd-destructive/20 dark:bg-fd-destructive/60 dark:focus-visible:ring-fd-destructive/40",
                outline:
                    "border bg-fd-background shadow-xs hover:bg-fd-accent hover:text-fd-accent-foreground dark:border-fd-input dark:bg-fd-input/30 dark:hover:bg-fd-input/50",
                secondary: "bg-fd-secondary text-fd-secondary-foreground hover:bg-fd-secondary/80",
                ghost: "hover:bg-fd-accent hover:text-fd-accent-foreground dark:hover:bg-fd-accent/50",
                link: "text-fd-primary underline-offset-4 hover:underline",
            },
            size: {
                default: "h-9 px-4 py-2 has-[>svg]:px-3",
                sm: "h-8 gap-1.5 rounded-md px-3 has-[>svg]:px-2.5",
                lg: "h-10 rounded-md px-6 has-[>svg]:px-4",
                icon: "size-9",
            },
        },
        defaultVariants: {
            variant: "default",
            size: "default",
        },
    },
);

function Button({
    className,
    variant,
    size,
    asChild = false,
    ...props
}: React.ComponentProps<"button"> &
    VariantProps<typeof buttonVariants> & {
        asChild?: boolean;
    }) {
    const Comp = asChild ? Slot : "button";

    return <Comp data-slot="button" className={cn(buttonVariants({ variant, size, className }))} {...props} />;
}

export { Button, buttonVariants };
