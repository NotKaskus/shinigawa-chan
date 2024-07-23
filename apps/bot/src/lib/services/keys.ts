export const baseCacheKey = (guildId: string): string => `shinbot:guilds:${guildId}`;

export const coreCacheKey = (guildId: string): string => `${baseCacheKey(guildId)}:core`;

export const utilityCacheKey = (guildId: string): string => `${baseCacheKey(guildId)}:utility`;