import { Group } from "~/builders";
import { Builders, isBuilder } from "~/utils";

/**
 * @deprecated Use isSlashGroupBuilder and isSlashParentBuilder instead
 */
export function isGroupBuilder(builder: any): builder is Group {
    if (!isBuilder(builder)) return false;

    const hasRoot = "root" in builder;
    const hasParent = "parent" in builder;

    return builder instanceof Group && builder.type === Builders.Group && hasRoot && hasParent;
}
