'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller, jwt } = app;
  router.get('/hello', jwt, controller.home.index);
  router.get('/users', controller.user.getUserList);
  router.post('/register', controller.user.register);
  router.post('/login', controller.user.login); // 首页
  router.post('/sendEmail', controller.sendMail.sendVerificationCode);
};

