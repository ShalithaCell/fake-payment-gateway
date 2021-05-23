const Koa = require('koa');
const koaBody = require('koa-body');
const KoaStatic = require('koa-static');
const cors = require('@koa/cors');
const router = require('./api');
const { exceptionService } = require('./services');

const app = new Koa();

app
    .use(koaBody())
    .use(cors())
    .use(exceptionService.errorHandler) // register generic error handler middleware
    .use(exceptionService.jsonErrorHandler) // register json error handler middleware
    .use(router()) // Use the Router on the sub routes
    .use(KoaStatic('public')) // server statics
    // Bootstrap the server
    .listen(process.env.PORT || 5100, () =>
    {
        console.log('server stared with port 5100');

        console.log();
        console.log();
        console.log('=======================Payment Gateway Application StartUp===========================');
        console.log('\x1b[33m\x1b[4m%s\x1b[0m', 'http://localhost:5100/api/');
        console.log('=====================================================================');
        console.log();
    });
