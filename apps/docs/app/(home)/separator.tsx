export function Separator() {
	return <div className="h-4 w-full border border-t-0" />;
}

export function SectionTitle({ content }: { content: React.ReactNode }) {
	return (
		<section className="dark:from-muted/50 dark:to-background relative flex w-full items-center justify-around overflow-hidden border border-t-0 bg-gradient-to-b py-8 dark:to-60% md:py-10 lg:py-12">
			<h2 className="z-10 text-2xl font-bold sm:text-4xl md:text-5xl lg:text-6xl">
				{content}
			</h2>
		</section>
	);
}
