module.exports = {
	apps : [
		{
			name : 'nuxt',
			script : './node_modules/nuxt/bin/nuxt-start',
			node_args: '--experimental-worker',
			exec_mode: 'cluster',
			instances: 'max',
			env: { 
				NODE_ENV: 'development'
			},
			env_production : {
				NODE_ENV: 'production'
			}
		}
	]
};
