'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  router.get('/hello', controller.home.index);
  // router.get('/users', controller.user.getUserList);
  router.post('/register', controller.user.register);
  router.post('/login', controller.user.login);
};

