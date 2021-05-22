const Router = require('koa-router');
const StatusCodes = require('http-status-codes');
const { CardPayment, emailNotificationService } = require('../../../services');
const { Card, Response } = require('../../../types');

// Prefix all routes with: /auth
const router = new Router({
    prefix : '/api/v1/payment/card',
});

router.get('/', async (ctx, next) =>
{
    const response = new Response();

    const data = await CardPayment.history();

    response.success = true;
    response.message = `Transaction history.`;
    response.data = {
        data,
    };
    ctx.response.status = StatusCodes.OK;
    ctx.body = response;

    next().then();
});

router.post('/', async (ctx, next) =>
{
    const request = Object.setPrototypeOf(ctx.request.body, Card.prototype);

    const response = new Response();

    if (!request.isValid())
    {
        ctx.response.status = StatusCodes.BAD_REQUEST;
        response.success = false;
        response.message = "required field(s) missing";
        response.data = {
            message : "required field(s) missing",
        };
        next().then();

        ctx.body = response;

        return;
    }
    console.log('payment requested');
    const data = await CardPayment.payment(request);

    if (!data)
    {
        ctx.response.status = StatusCodes.FORBIDDEN;

        response.success = false;
        response.message = "Cannot proceed payment.";
        response.data = {
            message : data,
        };

        ctx.body = response;
        next().then();

        return;
    }

    console.log('data Exists');

    await emailNotificationService.sendReceiptEmail(
        request.app_name,
        request.customer_email,
        request.card_holder_name,
        request.service,
        request.amount,
        request.amount,
    );

    response.success = true;
    response.message = `Transaction is successful.`;
    response.data = {
        data,
    };
    ctx.response.status = StatusCodes.OK;
    ctx.body = response;

    next().then();
});

module.exports = router;
