export type ClientConfig = {
	env: string;
	isDev: boolean;
	enableTasks: boolean;
	discord: {
		token: string;
		id: string;
		secret: string;
		webhook: string;
		devServers: string[];
		ownerIds: string[];
	};
	api: {
		host: string;
		port: number;
	};
	rpc: {
		server: {
			port: number;
		};
	};
	db: {
		url: string;
		cacheExpiry: number;
	};
	redis: {
		host: string;
		port: number;
		password: string;
	};
	sentry: {
		dsn: string;
	};
};