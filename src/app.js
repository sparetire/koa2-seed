const Koa = require('koa');
const http = require('http');
const https = require('https');
const helmet = require('koa-helmet');
const serve = require('koa-static');
const path = require('path');
const controller = require('./controller');
const router = require('koa-router')();
const cors = require('./middleware/cors');
const config = require('./config/app.config');

// 设置所有http请求默认的socket连接池的最大连接数
http.globalAgent.maxSockets = 7000;
https.globalAgent.maxSockets = 7000;

const app = new Koa();

if (process.env.NODE_ENV === 'dev') {
	app.use(cors());
} else {
	app.use(helmet());
}

app.use(serve(path.resolve(__dirname, '../public')));

app.use(controller(router));
	// .use(router.allowedMethods());

app.on('error', (err, ctx) => {
	console.error('GLOBAL-ERROR:');
	console.error(err);
});

app.listen(config.port);

console.log(`App is running on port: ${config.port}`);