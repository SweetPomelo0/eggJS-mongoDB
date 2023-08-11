const { Controller } = require('egg');

class UserController extends Controller {
  /**
   * 获取用户列表
   */
  getUserList() {
    const { ctx } = this;

    ctx.body = {
      code: 0,
      message: 'success',
      data: mockUsers,
    };
  }
}
module.exports = UserController;

