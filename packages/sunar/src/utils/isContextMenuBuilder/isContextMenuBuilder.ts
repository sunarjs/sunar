import { ContextMenu } from "~/builders";
import { Builders, isBuilder } from "~/utils";

export function isContextMenuBuilder(builder: any): builder is ContextMenu {
    if (!isBuilder(builder)) return false;

    const hasData = "data" in builder;
    if (!hasData || typeof builder.data !== "object" || !builder.data) return false;

    const hasName = "name" in builder.data;
    const hasType = "type" in builder.data;

    return builder instanceof ContextMenu && builder.type === Builders.ContextMenu && hasName && hasType;
}
