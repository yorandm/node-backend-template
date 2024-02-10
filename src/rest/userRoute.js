const Router = require('@koa/router');
const userService = require('../service/userService');
const { checkJwt, checkReadMessageScope } = require('../core/auth0');


const getUserByEmail = async (ctx) => {
  const {
    authorization
  } = ctx.request.headers;
  const {
    userEmail
  } = ctx.params;
  ctx.body = await userService.getUserEmail(userEmail, authorization);
};



/**
 * Install transaction routes in the given router.
 *
 * @param {Router} app - The parent router.
 */
module.exports = (app) => {
  const router = new Router({
    prefix: '/users',
  });
  router.get('/:userEmail',  checkJwt, getUserByEmail);
  app.use(router.routes())
    .use(router.allowedMethods());
};