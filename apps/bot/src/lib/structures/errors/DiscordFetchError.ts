import { ShinBotError } from '#lib/structures/errors/ShinBotError';
import { ShinBotErrorCodes } from '#lib/types/Enums';

export type DiscordFetchErrorErrorOptions = {
	message?: string;
	userMessage?: string;
	resourceId: string;
};

export class DiscordFetchError extends ShinBotError {
	public override readonly userMessage: string;

	public readonly resourceId: string;

	public constructor(options: DiscordFetchErrorErrorOptions) {
		super(options.message ?? `Failed to fetch a Discord resource`, {
			name: 'DiscordFetchError',
			code: ShinBotErrorCodes.DiscordFetch
		});

		this.userMessage = options.userMessage ?? 'Something went wrong.';
		this.resourceId = options.resourceId;
	}
}