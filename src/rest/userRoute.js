const Router = require('@koa/router');
const auth = require('../core/createAuth');
const userService = require('../service/userService');


const getUserByEmail = async (ctx) => {
  const {
    authorization
  } = ctx.request.headers;
  const {
    userEmail
  } = ctx.params;
  ctx.body = await userService.getUserByEmail(userEmail, authorization);
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
  router.get('/:userEmail', getUserByEmail);
  app.use(router.routes())
    .use(router.allowedMethods());
};