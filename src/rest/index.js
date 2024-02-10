const Router = require('@koa/router');
const installUserRoute = require('./userRoute');


/**
 * Install all routes in the given Koa application.
 *
 * @param {Koa} app - The Koa application.
 */
module.exports = (app) => {
    const router = new Router({
        prefix: '/api',
    });

    installUserRoute(router);
   
    app.use(router.routes())
        .use(router.allowedMethods());
};