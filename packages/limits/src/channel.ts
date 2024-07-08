/**
 * Limit of characters for the name of a channel.
 * @readonly
 */
export const ChannelNameLimit = 100;

/**
 * Limit of characters for the description of a channel.
 * @readonly
 */
export const ChannelDescriptionLimit = 1024;

/**
 * Limit of threads that can be fetched for a channel.
 * @readonly
 */
export const ChannelThreadsFetchLimit = 100;

/**
 * Limit of pinned messages for a text channel.
 * @readonly
 */
export const TextChannelPinsLimit = 50;

/**
 * Limit of messages that can be deleted in bulk for a text channel.
 * @readonly
 */
export const TextChannelBulkDeleteMessagesLimit = 100;

/**
 * Limit of messages that can be fetched for a text channel.
 * @readonly
 */
export const TextChannelMessagesFetchLimit = 100;

/**
 * Limit of child channels that can be created under a category channel.
 * @readonly
 */
export const CategoryChannelChildrenLimit = 50;

/**
 * Limit of users that can be in a voice channel.
 * @readonly
 */
export const VoiceChannelUsersLimit = 99;

/**
 * Limit of viewers that can view a screen in a voice channel.
 * @readonly
 */
export const VoiceChannelScreenViewersLimit = 50;

/**
 * Limit of users that can be in a stage channel.
 * @readonly
 */
export const StageChannelUsersLimit = 250;

/**
 * Limit of users that can be in a direct message group.
 * @readonly
 */
export const DMGroupUsersLimit = 10;

/**
 * Limit of uses for an invite to a channel.
 * @readonly
 */
export const ChannelInviteUsesLimit = 100;

/**
 * Limit of age (in seconds) for an invite to a channel.
 * @readonly
 */
export const ChannelInviteAgeLimit = 604800; // 604800 seconds = 7 days
