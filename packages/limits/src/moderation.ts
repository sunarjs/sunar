/**
 * Maximum duration (in seconds) for timeouts used in auto-moderation actions.
 * @readonly
 */
export const AutoModerationTimeoutDurationLimit = 2419200;

/**
 * Maximum number of characters allowed in a custom block message used in auto-moderation.
 * @readonly
 */
export const AutoModerationCustomBlockMessageLengthLimit = 150;

/**
 * Maximum duration (in seconds) for custom timeout actions in auto-moderation.
 * @readonly
 */
export const AutoModerationActionMetadataTimeoutDurationLimit = 2419200;

/**
 * Maximum number of exempt channels from auto-moderation rules.
 * @readonly
 */
export const AutoModerationRuleExemptChannelsLimit = 50;

/**
 * Maximum number of exempt roles from auto-moderation rules.
 * @readonly
 */
export const AutoModerationRuleExemptRolesLimit = 20;

/**
 * Maximum number of characters allowed in a single regular expression pattern used in auto-moderation.
 * @readonly
 */
export const AutoModerationTriggerMetadataRegexPatternLimit = 260;

/**
 * Maximum number of regular expression patterns allowed in auto-moderation triggers.
 * @readonly
 */
export const AutoModerationTriggerMetadataRegexPatternsLimit = 10;

/**
 * Maximum number of keywords allowed in the allow list metadata for auto-moderation triggers.
 * @readonly
 */
export const AutoModerationTriggerMetadataKeywordAllowListLimit = 100;

/**
 * Maximum number of characters per keyword in the allow list metadata for auto-moderation triggers.
 * @readonly
 */
export const AutoModerationTriggerMetadataAllowListKeywordLimit = 60;

/**
 * Maximum number of keyword filters that can be applied in auto-moderation triggers.
 * @readonly
 */
export const AutoModerationTriggerMetadataKeywordFiltersLimit = 100;

/**
 * Maximum number of characters per keyword in the preset metadata for auto-moderation triggers.
 * @readonly
 */
export const AutoModerationTriggerMetadataKeywordPresetLimit = 60;

/**
 * Maximum number of keywords allowed in the allow list for preset metadata in auto-moderation triggers.
 * @readonly
 */
export const AutoModerationTriggerMetadataKeywordPresetAllowListLimit = 60;

/**
 * Maximum number of mentions that can trigger spam detection in auto-moderation.
 * @readonly
 */
export const AutoModerationTriggerMetadataMentionSpamLimit = 50;

/**
 * Maximum number of channel preset triggers that can be defined for auto-moderation.
 * @readonly
 */
export const AutoModerationTriggerTypeChannelPresetTriggersLimit = 1;

/**
 * Maximum number of guild keyword triggers that can be defined for auto-moderation.
 * @readonly
 */
export const AutoModerationTriggerTypeGuildKeywordTriggersLimit = 6;

/**
 * Maximum number of guild spam triggers that can be defined for auto-moderation.
 * @readonly
 */
export const AutoModerationTriggerTypeGuildSpamTriggersLimit = 1;

/**
 * Maximum number of guild mention spam triggers that can be defined for auto-moderation.
 * @readonly
 */
export const AutoModerationTriggerTypeGuildMentionSpamTriggersLimit = 1;
