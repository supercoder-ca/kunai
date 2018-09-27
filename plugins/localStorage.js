
import createPersistedState from 'vuex-persistedstate';

export default ({ store, app }) => {
	if (! process.client) return;
	if (! app.mixins) app.mixins = [];
	app.mixins.push({
		mounted () {
			createPersistedState({
				key: 'vuex',
				paths: [ 'form_auth' ],
			})(store);
		},
	});
};