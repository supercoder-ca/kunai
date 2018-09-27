import Vue from 'vue';
let config;

if (process.server) {
	config = require('config').util.toObject().client;
	Vue.use(config);
};

export default function ({ nuxtState, beforeNuxtRender }, inject) {
	if (process.client) {
		config = nuxtState.__CONFIG__;
	} else {
		beforeNuxtRender(({ nuxtState }) => {
			nuxtState.__CONFIG__ = config;
		});
	};

	inject('config', config);
};

//Vue.use(_);