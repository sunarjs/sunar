import { type ClientOptions, Client as DClient } from "discord.js";

import { handleSignals } from "./handlers";
import { context } from "./stores";
import type { SunarSignals } from "./types";

export class Client<Ready extends boolean = boolean> extends DClient<Ready> {
    public constructor(options: ClientOptions) {
        super(options);

        context.client = this;
    }

    public override login(token?: string): Promise<string> {
        handleSignals();
        return super.login(token);
    }
}

declare module "discord.js" {
    interface ClientEvents extends SunarSignals {}
}
