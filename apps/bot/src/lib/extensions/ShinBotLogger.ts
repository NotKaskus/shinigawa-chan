import { getUserAvatarUrl } from '#lib/utilities/discord';
import { WebhookErrorBuilder } from '#lib/structures/builders/WebhookErrorBuilder';
import { ShinBotErrors } from '#lib/types/Enums';
import { Result, container } from '@sapphire/framework';
import { Logger } from '@sapphire/plugin-logger';
import { Scope, captureException, captureMessage } from '@sentry/node';
import { redBright } from 'colorette';
import type { EmbedBuilder } from 'discord.js';

export class ShinBotLogger extends Logger {
	public infoTag(tag: string, value: unknown): void {
		super.info(`[${redBright(tag)}] ${value}`);
	}

	public sentryMessage(message: string, { context }: { context?: NonNullable<unknown> } = {}): void {
		super.error(message);

		if (container.config.isDev) return;

		captureMessage(message, (scope): Scope => {
			if (context) scope.setExtras(context);
			return scope;
		});
	}

	public sentryError(error: unknown, { message, context }: { message?: string; context?: NonNullable<unknown> } = {}): void {
		message //
			? super.error(message, error)
			: super.error(error);

		if (container.config.isDev) return;

		if (error instanceof Error) {
			captureException(error, (scope): Scope => {
				if (context) scope.setExtras(context);
				return scope;
			});
		}
	}

	public async webhookError(builder: (builder: WebhookErrorBuilder) => WebhookErrorBuilder): Promise<void> {
		const { webhook } = container.client;
		if (!webhook) return;

		const embed: EmbedBuilder = builder(new WebhookErrorBuilder()).build();

		const result = await Result.fromAsync(async () => {
			return await webhook.send({
				avatarURL: getUserAvatarUrl(container.client.user!),
				embeds: [embed]
			});
		});

		result.inspectErr((error) => {
			container.client.emit(ShinBotErrors.WebhookError, error);
		});
	}
}