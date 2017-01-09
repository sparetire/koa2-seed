const multer = require('koa-multer');
const path = require('path');
function upload(opts) {
	return async (ctx, next) => {
		console.log(this.req.files);
		ctx.set('Access-Control-Allow-Origin', '*');
		ctx.set('Access-Control-Request-Headers', '*');
		ctx.set('Access-Control-Request-Method', '*');
		ctx.body = '<script>window.top.sayHello("Hello")</script>';
		await next();
	};
}

module.exports = {
	'post /upload': [multer({
		dest: path.resolve(__dirname, '../../uploads')
	}).single('picture'), upload()]
};