import { defineTsupConfig } from '../../scripts/tsup';
import { relative } from 'node:path';

export default defineTsupConfig({
	bundle: false,
	clean: true,
	dts: false,
	entry: ['src/**/*.ts', '!src/**/*.d.ts'],
	format: ['esm'],
	keepNames: true,
	minify: false,
	shims: false,
	skipNodeModulesBundle: true,
	splitting: false,
	sourcemap: true,
	target: 'es2022',
	treeshake: true,
	tsconfig: relative(__dirname, './tsconfig.json')
});