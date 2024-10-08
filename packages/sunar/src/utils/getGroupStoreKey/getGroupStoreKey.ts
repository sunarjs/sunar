import type { Group } from '../../builders';
import { isGroupBuilder } from '../isGroupBuilder';

export function getGroupStoreKey(root: string | Group, parent?: string | null, sub?: string | null) {
	if (isGroupBuilder(root)) {
		return `${root.root}_${root.parent && root.sub ? `${root.parent}_${root.sub}` : root.parent}`;
	}
	return `${root}_${parent && sub ? `${parent}_${sub}` : sub}`;
}
