import { Builders, isBuilder } from "..";
import { Modal } from "../../builders";

export function isModalBuilder(builder: any): builder is Modal {
    if (!isBuilder(builder)) return false;
    return builder instanceof Modal && builder.type === Builders.Modal;
}
