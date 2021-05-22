// define generic error handler
const errorHandler = async (ctx, next) =>
{
    try
    {
        await next();
    }
    catch (err)
    {
        console.log('errorHandler');
        ctx.status = err.status || 500;
        ctx.body = err.expose ? err.message : 'An error occurred!';
    }
};

// define json request error handler
const jsonErrorHandler = async (ctx, next) =>
{
    try
    {
        await next();
    }
    catch (err)
    {
        const isJson = ctx.get('Accept') === 'application/json';

        if (isJson)
        {
            console.log('jsonErrorHandler isJson');
            ctx.status = err.status || 500;
            ctx.body = {
                error : `An error just occurred`,
            };
        }
        else
        {
            console.log('jsonErrorHandler !isJson');
            throw err;
        }
    }
};

module.exports = {
    errorHandler,
    jsonErrorHandler,
};
