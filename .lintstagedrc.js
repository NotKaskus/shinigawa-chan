module.exports = {
	'*.{mjs,cjs,js,ts}': [
		'eslint --fix', //
		'prettier --write --log-level=warn "**/*.{mjs,cjs,js,ts}"'
	],
	'*.{json,yml,yaml,md}': [
		'prettier --write --log-level=warn "**/*.{json,yml,yaml,md}"' //
	]
};
