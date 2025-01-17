import { envGetNumber, envGetString, validateConfig } from '#lib/utilities/config';
import { NodeEnvironments, mainFolder } from '#lib/utilities/constants';
import { container } from '@sapphire/framework';
import { config } from 'dotenv';
import { resolve } from 'path';
import type { ClientConfig } from '#lib/types/Config';

export function loadConfig(): void {
	process.env.NODE_ENV ??= NodeEnvironments.Dev;

	config({ path: resolve(mainFolder, '../.env') });
	const env = envGetString('NODE_ENV');
	const isDev =
		env !== NodeEnvironments.Production && //
		env !== NodeEnvironments.Staging;

	const clientConfig: ClientConfig = {
		env,
		isDev,
		enableTasks: !isDev || envGetString('ENABLED_TASKS') === 'true',
		discord: {
			token: envGetString('DISCORD_TOKEN'),
			id: envGetString('DISCORD_ID'),
			secret: envGetString('DISCORD_SECRET'),
			webhook: envGetString('DISCORD_WEBHOOK'),
			devServers: ['953375922990506005'],
			ownerIds: ['137657554200166401']
		},
		api: {
			host: envGetString('API_HOST'),
			port: envGetNumber('API_PORT')
		},
		rpc: {
			server: {
				port: envGetNumber('RPC_SERVER_PORT')
			}
		},
		redis: {
			host: envGetString('REDIS_HOST'),
			port: envGetNumber('REDIS_PORT'),
			password: envGetString('REDIS_PASS')
		},
		db: {
			url: envGetString('DATABASE_URL'),
			cacheExpiry: envGetNumber('DATABASE_CACHE_EXPIRY')
		},
		sentry: {
			dsn: envGetString('SENTRY_DSN')
		},
	};

	const valid = validateConfig(clientConfig);
	if (!valid) {
		throw new Error('Invalid config. Exiting.');
	}

	container.config = clientConfig;
}