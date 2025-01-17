import { Builders, isBuilder } from "..";
import { Slash } from "../../builders";

export function isSlashBuilder(builder: any): builder is Slash {
    if (!isBuilder(builder)) return false;

    const hasData = "data" in builder;
    if (!hasData || typeof builder.data !== "object" || !builder.data) return false;

    const hasName = "name" in builder.data;
    const hasDescription = "description" in builder.data;

    return builder instanceof Slash && builder.type === Builders.Slash && hasName && hasDescription;
}
