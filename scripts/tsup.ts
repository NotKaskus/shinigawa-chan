import { defineConfig } from 'tsup';
import type { Options } from 'tsup';

type MaybePromise<T> = Promise<T> | T;

type TsupOptions = Omit<Options, 'tsconfig'> & Required<Pick<Options, 'tsconfig'>>;

export function defineTsupConfig(
	options: TsupOptions,
	override = false
): Options | Options[] | ((overrideOptions: Options) => MaybePromise<Options | Options[]>) {
	if (override) return defineConfig(options);
	return defineConfig({
		bundle: false,
		clean: true,
		dts: true,
		entry: ['src/index.ts'],
		format: ['esm'],
		keepNames: true,
		minify: false,
		shims: false,
		skipNodeModulesBundle: true,
		splitting: false,
		sourcemap: true,
		target: 'es2022',
		treeshake: true,
		...options
	});
}
