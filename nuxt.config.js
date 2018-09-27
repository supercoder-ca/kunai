const config = require('config');

module.exports = {
	head: {
		title: config.get('frontend.title'),
		meta: [
			{ charset: 'utf-8' },
			{ name: 'viewport', content: 'width=device-width, initial-scale=1' },
			{ hid: 'description', name: 'description', content: config.get('frontend.description') }
		],
		link: [
			{ rel: 'icon', type: 'image/x-icon', href: '/icons/favicon.ico' }
		],
	},
	css: [
		'@/assets/css/googlefonts.css',
		'@/assets/css/vuetify.min.css',
		'@/assets/css/style.css'
	],
	build: {
		extractCSS: true,
		parallel: true,
		extend (config, ctx) {
			if (ctx.isDev && ctx.isClient) {
				config.module.rules.push({
					enforce: 'pre',
					test: /\.(js|vue)$/,
					loader: 'eslint-loader',
					exclude: /(node_modules)/
				});
			};
		},
	},
	env: {
		NODE_PORT: process.env.NODE_PORT || 3000,
	},
	serverMiddleware: [
		'@/api/server'
	],
	router: {
		middleware: [ 'session' ],
		extendRoutes (routes, resolve) {
			routes.push({
				name: 'notFound',
				path: '*',
				component: '@/pages/404.vue',
			});
		},
	},
	plugins: [ '@/plugins/vuetify.js', '@/plugins/lodash.js', '@/plugins/config.js', { src: '@/plugins/localStorage.js', ssr: false } ],
	modules: [ '@nuxtjs/axios' ],
	...config.get('pluggable'),
};