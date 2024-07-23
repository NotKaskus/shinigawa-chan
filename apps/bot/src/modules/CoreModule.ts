import { CoreSettingsService } from '#lib/services/CoreSettingsService';
import { ShinBotModules } from '#lib/types/Enums';
import { Module } from '@kbotdev/plugin-modules';
import { ApplyOptions } from '@sapphire/decorators';

@ApplyOptions<Module.Options>({
	name: ShinBotModules.Core,
	fullName: 'Core Module'
})
export class CoreModule extends Module {
	public readonly settings: CoreSettingsService;

	public constructor(context: Module.LoaderContext, options: Module.Options) {
		super(context, options);

		this.settings = new CoreSettingsService();

		this.container.core = this;
	}
}

declare module '@kbotdev/plugin-modules' {
	// eslint-disable-next-line @typescript-eslint/consistent-type-definitions
	interface Modules {
		[ShinBotModules.Core]: never;
	}
}