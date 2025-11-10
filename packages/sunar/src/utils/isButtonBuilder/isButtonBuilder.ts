import { Button } from "~/builders";

import { Builders, isBuilder } from "..";

export function isButtonBuilder(builder: any): builder is Button {
    if (!isBuilder(builder)) return false;
    return builder instanceof Button && builder.type === Builders.Button;
}
