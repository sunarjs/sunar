import { SunarIcon } from './icon';

export function Logo(props: React.SVGProps<SVGSVGElement>) {
	return (
		<div
			title="Sunar"
			className="flex items-center gap-x-2 text-stone-800 dark:text-stone-100"
		>
			<SunarIcon {...props} />
			<span className="text-xl font-medium">Sunar</span>
		</div>
	);
}
