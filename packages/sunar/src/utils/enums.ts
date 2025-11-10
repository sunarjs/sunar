export enum Builders {
    Slash = 0,
    ContextMenu = 1,
    Protector = 2,
    Signal = 3,
    Button = 4,
    Modal = 5,
    SelectMenu = 6,
    Autocomplete = 7,
    /**
     * @deprecated Use SlashGroup instead
     */
    Group = 8,
    SlashSubcommand = 9,
    SlashParent = 10,
}

export enum CooldownScope {
    User = 0,
    Channel = 1,
    Guild = 2,
    Global = 3,
}
