import { container } from '@sapphire/framework';
import { Counter, Gauge, register } from 'prom-client';

type ShinBotCounters = {
	commands: Counter;
};

export class ShinBotMetrics {
	private readonly counters: ShinBotCounters;

	public constructor() {
		this.setupGauges();

		this.counters = {
			commands: new Counter({
				name: 'shinbot_commands_total',
				help: 'Counter for total amount of command uses.',
				registers: [register],
				labelNames: ['command', 'success'] as const
			})
		};
	}

	/**
	 * Increment the command counter.
	 * @param data - The data to increment the counter
	 */
	public incrementCommand(data: { command: string; success: boolean; value?: number }): void {
		const { command, success, value = 1 } = data;

		this.counters.commands.inc({ command, success: String(success) }, value);
	}

	private setupGauges(): void {
		new Gauge({
			name: 'shinbot_guilds_total',
			help: 'Gauge for total amount of guilds.',
			registers: [register],
			collect(): void {
				if (container.client.isReady()) {
					this.set(container.client.guilds.cache.size);
				}
			}
		});

		new Gauge({
			name: 'shinbot_users_total',
			help: 'Gauge for total amount of users.',
			registers: [register],
			collect(): void {
				if (container.client.isReady()) {
					this.set(container.client.guilds.cache.reduce((acc, guild) => acc + guild.memberCount, 0));
				}
			}
		});

		new Gauge({
			name: 'shinbot_counting_channels_total',
			help: 'Gauge for total amount of counting channels.',
			registers: [register],
			async collect(): Promise<void> {
				if (container.client.isReady()) {
					// TODO: Get the data to return from this in prisma database
					// this.set(await container.youtube.channels.count());
				}
			}
		});
	}
}