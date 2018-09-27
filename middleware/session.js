export default function (ctx) {
	if (! ctx.req) return;
	if (process.server) {
		if (ctx.req.headers.cookie) ctx.app.$axios.defaults.headers.common.cookie = ctx.req.headers.cookie;
	};
};