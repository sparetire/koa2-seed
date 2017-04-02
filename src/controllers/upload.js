const multer = require('koa-multer');
const path = require('path');


let storage = multer.diskStorage({
	destination: function (req, file, cb) {
		cb(null, path.resolve(__dirname, '../../uploads'));
	},
	filename: function (req, file, cb) {
		cb(null, file.originalname);
	}
});

function upload(opts) {
	return async (ctx, next) => {
		console.log(ctx.req.files);
		ctx.body = '<script>window.top.sayHello("Hello")</script>';
		await next();
	};
}

module.exports = {
	'post /upload': [multer({
		storage,
		limits: '5MB'
	}).single('images'), upload()]
};