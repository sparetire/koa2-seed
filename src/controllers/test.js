const bodyparser = require('koa-bodyparser');

function test(opts) {
	return async (ctx, next) => {
		ctx.body = {
			test: 'test'
		};
	};
}

module.exports = {
	'post /test': [bodyparser(), test()]
};