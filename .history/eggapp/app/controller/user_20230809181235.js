const Controller = require('egg').Controller;

class UserController extends Controller {
  /**
   * 获取用户列表
   */
  getUserList() {
    const { ctx, service } = this;
    // const users = service.user.find();
    const users = await.ctx.service.user.find();

    ctx.body = {
      code: 0,
      message: 'success',
      data: users,
    };
  }
}
module.exports = UserController;

