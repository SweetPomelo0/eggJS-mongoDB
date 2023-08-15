'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  router.get('/', controller.home.index); // 主页
  router.get('/users', controller.user.getUserList); // 获取所有用户信息 - 测试
  router.post('/users/register', controller.user.register); // 账号注册
  router.post('/users/login', controller.user.login); // 首页登录
  router.post('/users/currentUser', controller.user.getCurrentUserList); // 获取当前用户信息
  router.put('/users/resetPassword', controller.user.resetPassword); // 修改密码
  router.put('/users/forgetPassword', controller.user.forgetPassword); // 忘记密码/重置密码

  router.post('/api/sendEmail', controller.sendMail.sendVerificationCode); // 发送验证码
};

