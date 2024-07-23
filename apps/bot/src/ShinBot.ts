import '@kbotdev/plugin-modules/register';
import '@sapphire/plugin-scheduled-tasks/register';
import '@sapphire/plugin-api/register';
import '#plugins/register';
import '#lib/utilities/Augments';

import { loadConfig } from '#config';
import { ShinBotClient } from '#lib/extensions/ShinBotClient';
import { ApplicationCommandRegistries, RegisterBehavior, container } from '@sapphire/framework';

ApplicationCommandRegistries.setDefaultBehaviorWhenNotIdentical(RegisterBehavior.BulkOverwrite);

async function main(): Promise<void> {
	let client: ShinBotClient | undefined = undefined;

	try {
		const { discord } = container.config;

		client = new ShinBotClient();

		await client.login(discord.token);
	} catch (error: unknown) {
		container.logger.sentryError(error);

		await client?.destroy();
		process.exit(1);
	}
}

void loadConfig();

void main();