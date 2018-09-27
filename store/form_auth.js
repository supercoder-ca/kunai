const blake2 = require('blake2b-wasm');

export const state = () => ({
	authenticated: false,
	user: null,
});

export const mutations = {
	LOGIN (state, user) {
		state.authenticated = true;
		state.user = user
	},
	LOGOUT (state) {
		state.authenticated = false;
		state.user = null;
	},
};

export const getters = {
	authenticated (state) {
		return !! state.authenticated;
	},
	user (state) {
		return state.user;
	},
};

export const actions = {
	async login({ commit, state, getters }, payload) {
		if (getters.authenticated) return false;
		let hash = blake2().update(Buffer.from(payload.password)).digest('hex');
		let { data } = await this.$axios.post('/api/auth/login', {
			username: payload.username,
			password: hash,
		});
		commit('LOGIN', data.user);
	},
	async signup({ commit, state, getters }, payload) {
		if (getters.authenticated) return false;
		let hash = blake2().update(Buffer.from(payload.password)).digest('hex');
		let { data } = await this.$axios.post('/api/auth/signup', {
			username: payload.username,
			email: payload.email,
			password: hash,
		});
		if (! data.ok) throw data.e || data.message || new Error('UNDEFINED SERVER ERROR');
		commit('LOGIN', data.user);
	},
	async logout({ commit, state, getters }) {
		if (! getters.authenticated) return false;
		let result = await this.$axios.post('/api/auth/logout');
		console.log('RR', result);
		commit('LOGOUT');
	},
};