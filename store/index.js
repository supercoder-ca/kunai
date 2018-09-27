import createPersistedState from 'vuex-persistedstate';
const blake2 = require('blake2b-wasm');

export const state = () => ({
});

export const actions = {
	async nuxtServerInit (store, ctx) {
		console.log(ctx.req.session)
		await blake2.ready();
	},
};

export const plugins = process.browser ? [
	createPersistedState({
		key: 'vuex',
		paths: [ 'form_auth' ],
	})
] : [];