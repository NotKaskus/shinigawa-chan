import type { ShinBotError } from '#lib/structures/errors/ShinBotError';
import type { ShinBotCommand } from '#lib/extensions/ShinBotCommand';
import type { MessageComponentInteraction, ModalSubmitInteraction } from 'discord.js';
import type { ChannelPermissionsError } from '#lib/structures/errors/ChannelPermissionsError';

export type ErrorPayload = {
	error: ShinBotError;
};

export type ChannelPermissionsPayload = {
	error: ChannelPermissionsError;
	interaction:
		| ShinBotCommand.ChatInputCommandInteraction //
		| ShinBotCommand.ContextMenuCommandInteraction
		| MessageComponentInteraction
		| ModalSubmitInteraction;
};