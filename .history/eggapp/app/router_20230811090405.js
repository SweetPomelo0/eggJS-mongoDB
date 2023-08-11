'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller, jwt } = app;
  router.get('/hello', jwt, controller.home.index);
  router.get('/users', controller.user.getUserList); // 获取所有用户信息 - 测试
  router.post('/login', controller.user.login); // 首页登录
  router.post('/register', controller.user.register); // 账号注册
  router.get('/currentUser', controller.user.getCurrentUserList); // 获取当前用户信息

  router.post('/sendEmail', controller.sendMail.sendVerificationCode); // 发送验证码
};

