export default function (ctx) {
	if (! ctx.store.getters['form_auth/authenticated']) {
		return ctx.redirect('/login');
	};
};