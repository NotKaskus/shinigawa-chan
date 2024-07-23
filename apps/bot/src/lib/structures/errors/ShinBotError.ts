import type { ShinBotErrorCode } from '#lib/types/Enums';

export type ShinBotErrorOptions = {
	name?: string;
	code: ShinBotErrorCode;
	userMessage?: string;
};

export class ShinBotError extends Error {
	public override readonly name: string;

	public readonly code: ShinBotErrorCode;

	public readonly userMessage: string | undefined;

	public constructor(message: string, { name, code, userMessage }: ShinBotErrorOptions) {
		super(message);

		this.name = name ?? 'ShinBotError';
		this.code = code;
		this.userMessage = userMessage;
	}
}