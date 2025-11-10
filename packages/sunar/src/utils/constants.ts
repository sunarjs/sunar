import { Events } from "discord.js";

type MergeConst<T extends object, U extends object> = {
    readonly [K in keyof (T & U)]: (T & U)[K];
};

enum SunarEvents {
    Cooldown = "cooldown",
}

export const Signals: MergeConst<typeof Events, typeof SunarEvents> = {
    ...Events,
    ...SunarEvents,
};

export const Commands = {
    Slash: "slash",
    ContextMenu: "contextMenu",
    Autocomplete: "autocomplete",
} as const;

export const Components = {
    Button: "button",
    Modal: "modal",
    SelectMenu: "selectMenu",
} as const;
