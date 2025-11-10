import { SlashSubcommand } from "~/builders";
import { Builders, isBuilder } from "~/utils";

export function isSlashSubcommandBuilder(builder: any): builder is SlashSubcommand {
    if (!isBuilder(builder)) return false;
    return builder instanceof SlashSubcommand && builder.type === Builders.SlashSubcommand;
}
