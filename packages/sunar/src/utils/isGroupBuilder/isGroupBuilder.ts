import { Builders, isBuilder } from '..';
import { Group } from '../../builders';

export function isGroupBuilder(builder: any): builder is Group {
	if (!isBuilder(builder)) return false;

	const hasRoot = 'root' in builder;
	const hasParent = 'parent' in builder;

	return builder instanceof Group && builder.type === Builders.Group && hasRoot && hasParent;
}
