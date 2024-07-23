import { ShinBotError } from '#lib/structures/errors/ShinBotError';
import { Result } from '@sapphire/framework';
import type { ShinBotErrorOptions } from '#lib/structures/errors/ShinBotError';

export abstract class ResultClass {
	public ok(): Result.Ok<undefined>;
	public ok<T>(value: T): Result.Ok<T>;
	public ok<T>(value?: T): Result.Ok<T | undefined> {
		return Result.ok(value);
	}

	public error(message: string, options: ShinBotErrorOptions): Result.Err<ShinBotError> {
		return Result.err(new ShinBotError(message, options));
	}
}