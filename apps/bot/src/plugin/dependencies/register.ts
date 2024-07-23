import { rootFolder } from '#lib/utilities/constants';
import { ShinBotMetrics } from '#lib/observability/ShinBotMetrics';
import { Validator } from '#lib/structures/Validator';
import * as Sentry from '@sentry/node';
import { Plugin, SapphireClient, container, preGenericsInitialization } from '@sapphire/framework';
import { PrismaClient } from '@prisma/client';
import { RedisClient } from '@killbasa/redis-utils';

export class DependenciesPlugin extends Plugin {
	public static [preGenericsInitialization](this: SapphireClient): void {
		try {
			const { config } = container;

			if (!config.isDev) {
				Sentry.init({
					dsn: config.sentry.dsn,
					tracesSampleRate: 0.2,
					integrations: [
						Sentry.modulesIntegration(),
						Sentry.functionToStringIntegration(),
						Sentry.linkedErrorsIntegration(),
						Sentry.consoleIntegration(),
						Sentry.httpIntegration({ breadcrumbs: true }),
						Sentry.rewriteFramesIntegration({ root: rootFolder })
					]
				});
			}

			container.validator = new Validator();
			container.metrics = new ShinBotMetrics();

			container.prisma = new PrismaClient({
				datasources: {
					database: {
						url: container.config.db.url
					}
				}
			});
			container.redis = new RedisClient(container.config.redis);

		} catch (error: unknown) {
			container.logger.sentryError(error);
			void this.destroy();
			process.exit(1);
		}
	}
}

SapphireClient.plugins.registerPreGenericsInitializationHook(DependenciesPlugin[preGenericsInitialization], 'Dependencies-PreGenericsInitialization');