import { SlashParent } from "~/builders";
import { Builders, isBuilder } from "~/utils";

export function isSlashParentBuilder(builder: any): builder is SlashParent {
    if (!isBuilder(builder)) return false;

    return builder instanceof SlashParent && builder.type === Builders.SlashParent;
}
