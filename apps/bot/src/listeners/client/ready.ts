import { isNullOrUndefined } from '#lib/utilities/functions';
import { ShinBotModules } from '#lib/types/Enums';
import { Events, Listener, Result } from '@sapphire/framework';
import { ApplyOptions } from '@sapphire/decorators';
import { green, red, yellowBright } from 'colorette';
import type { Modules } from '@kbotdev/plugin-modules';

@ApplyOptions<Listener.Options>({
	event: Events.ClientReady,
	once: true
})
export class ClientListener extends Listener<typeof Events.ClientReady> {
	private readonly modules = [
		{ key: 'Core', value: ShinBotModules.Core }, //
		{ key: 'Dev', value: ShinBotModules.Dev },
		// TODO: Add counting module in the future
		// { key: 'Counting', value: ShinBotModules.Counting }
	];

	public async run(): Promise<void> {
		void this.banner();
	}

	/**
	 * Print the bot's starting banner
	 */
	private async banner(): Promise<void> {
		const { client, config, stores, prisma, redis } = this.container;

		const loaded = (value: boolean): string => (value ? green('+') : red('-'));

		const loadedModules = this.checkModules(this.modules);

		const loadedServices = this.checkServices([
			{ key: 'Prisma', value: await Result.fromAsync(async () => await prisma.$queryRaw`SELECT 1`) },
			{ key: 'Redis', value: await Result.fromAsync(async () => await redis.client.ping()) },
			{ key: 'API Enabled', value: !isNullOrUndefined(client.options.api) },
			{ key: 'OAuth 2.0 Enabled', value: !isNullOrUndefined(client.options.api?.auth) }
		]);

		this.print({
			values: [
				{ name: 'User', value: client.user!.username },
				{ name: 'Environment', value: config.isDev ? 'Dev' : 'Production' }
			],
			lists: [
				{ name: 'Stores', items: stores.map((store) => `${store.size} ${store.name}`) },
				{ name: 'Modules', items: [...loadedModules.entries()].map(([name, value]) => `[${loaded(value)}] ${name}`) },
				{ name: 'Services', items: [...loadedServices.entries()].map(([name, value]) => `[${loaded(value)}] ${name}`) }
			]
		});
	}

	/**
	 * Print the provided options.
	 * @param options - The options
	 */
	private print(options: {
		values?: { name: string; value: string }[]; //
		lists?: { name: string; items: string[] }[];
	}): void {
		const { values, lists } = options;

		const pad = ' '.repeat(3);
		const title = yellowBright;

		for (const { name, value } of values ?? []) {
			this.printValue({ title: title(name), value, pad });
		}

		for (const { name, items } of lists ?? []) {
			this.printList({
				title: title(name),
				array: items,
				pad
			});
		}
	}

	/**
	 * Print a value.
	 * @param data - The data to print
	 */
	private printValue(data: { pad: string; title: string; value: string }): void {
		const { logger } = this.container;
		const { pad, title, value } = data;

		logger.info(`${pad}${title}: ${value}`);
	}

	/**
	 * Print a list of values.
	 * @param data - The data to print
	 */
	private printList(data: { pad: string; title: string; array: string[] }): void {
		const { logger } = this.container;
		const { pad, title, array } = data;

		logger.info(`\n${pad}${title}`);
		const last = array.pop();

		for (const entry of array) {
			logger.info(`${pad}├─ ${entry}`);
		}

		logger.info(`${pad}└─ ${last}`);
	}

	/**
	 * Check if the provided modules have properly loaded.
	 * @param modulesToCheck - The modules to check.
	 */
	private checkModules(modulesToCheck: { key: string; value: keyof Modules }[]): Map<string, boolean> {
		const { stores } = this.container;
		const modules = stores.get('modules');

		return modulesToCheck.reduce<Map<string, boolean>>((acc, { key, value }) => {
			acc.set(key, modules.has(value));
			return acc;
		}, new Map());
	}

	/**
	 * Check if the provided services are healthy.
	 * @param servicesToCheck - The services to check.
	 */
	private checkServices(servicesToCheck: { key: string; value: Result<unknown, unknown> | boolean }[]): Map<string, boolean> {
		return servicesToCheck.reduce<Map<string, boolean>>((acc, { key, value }) => {
			if (typeof value === 'boolean') {
				acc.set(key, value);
			} else {
				acc.set(key, value.isOk());
			}
			return acc;
		}, new Map());
	}
}