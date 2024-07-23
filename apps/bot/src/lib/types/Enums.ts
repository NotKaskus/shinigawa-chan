export const ShinBotModules = {
	Core: 'CoreModule' as const,
	Dev: 'DevModule' as const,
	Counting: 'CountingModule' as const,
};

export const ShinBotErrors = {
	WebhookError: 'webhookError' as const,
	ChannelPermissions: 'channelPermissions' as const
};

export const ShinBotErrorCodes = {
	ChannelPermissions: 'CHANNEL_PERMISSIONS',
	InvalidHex: 'INVALID_HEX',
	DiscordFetch: 'DISCORD_FETCH'
} as const;

export type ShinBotErrorCode = (typeof ShinBotErrorCodes)[keyof typeof ShinBotErrorCodes];