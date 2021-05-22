const Router = require('koa-router');
const StatusCodes = require('http-status-codes');
const { Response } = require('../../types');

// Prefix all routes with: /auth
const router = new Router({
    prefix : '/api',
});

router.get('/', async (ctx, next) =>
{
    const response = new Response();

    ctx.response.status = StatusCodes.OK;
    response.success = true;
    response.message = "Application Invoked !";
    response.data = {
        versions : {
            latest : 'v1',
            all    : {
                v1 : 'v1',
            },
        },
        endpoints : {
            card : {
                payment : {
                    endpoint : 'payment/card',
                    type     : 'post',
                },
                history : {
                    endpoint : 'payment/card',
                    type     : 'get',
                },
            },
            phone : {
                payment : {
                    endpoint : 'payment/phone',
                    type     : 'post',
                },
                history : {
                    endpoint : 'payment/phone',
                    type     : 'get',
                },
            },
        },
        examples : {
            payment : {
                card  : 'api/v1/payment/card',
                phone : 'api/v1/payment/phone',
            },
        },
    };

    ctx.body = response;
    next().then();
});

module.exports = router;
