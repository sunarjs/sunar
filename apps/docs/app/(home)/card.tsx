'use client';

import Link from 'next/link';
import React, { useRef, useState, PropsWithChildren } from 'react';

interface CardProps extends PropsWithChildren {
	title: string;
	description: React.ReactNode;
	icon: React.ReactNode;
	link?: string;
}

export const Card = ({
	icon,
	title,
	description,
	link,
	children,
}: CardProps) => {
	const divRef = useRef<HTMLDivElement>(null);
	const [isFocused, setIsFocused] = useState(false);
	const [position, setPosition] = useState({ x: 0, y: 0 });
	const [opacity, setOpacity] = useState(0);

	const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
		if (!divRef.current || isFocused) return;

		const div = divRef.current;
		const rect = div.getBoundingClientRect();

		setPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
	};

	const handleFocus = () => {
		setIsFocused(true);
		setOpacity(1);
	};

	const handleBlur = () => {
		setIsFocused(false);
		setOpacity(0);
	};

	const handleMouseEnter = () => {
		setOpacity(1);
	};

	const handleMouseLeave = () => {
		setOpacity(0);
	};

	return (
		<article
			ref={divRef}
			onMouseMove={handleMouseMove}
			onFocus={handleFocus}
			onBlur={handleBlur}
			onMouseEnter={handleMouseEnter}
			onMouseLeave={handleMouseLeave}
			className="relative flex w-full flex-col justify-center overflow-hidden p-4 sm:p-6 xl:p-8"
		>
			<div
				className="pointer-events-none absolute -inset-px opacity-0 transition duration-300"
				style={{
					opacity,
					background: `radial-gradient(1400px circle at ${position.x}px ${position.y}px, rgba(229, 229, 229, 0.030), transparent 40%)`,
				}}
			/>
			<header className="flex items-center justify-between">
				<div className="flex items-center gap-x-2 sm:gap-x-4">
					<div className="rounded-lg border bg-gradient-to-t from-background to-muted p-2 text-secondary-foreground dark:text-secondary-foreground/60">
						{icon}
					</div>
					<h3 className="text-lg font-semibold sm:text-xl md:text-2xl">
						{title}
					</h3>
				</div>
				{link && (
					<Link
						href={link}
						className="mr-1 text-3xl font-extralight text-muted-foreground transition-colors hover:text-foreground"
					>
						↗
					</Link>
				)}
			</header>
			<main className="flex flex-col">
				<p className="my-2 text-pretty text-sm text-muted-foreground sm:text-base lg:my-4 xl:text-lg">
					{description}
				</p>
				{children}
			</main>
		</article>
	);
};
