const UserService = require('../service/user');

const Controller = require('egg').Controller;

class UserController extends Controller {
  /**
   * 获取用户列表
   */
  getUserList() {
    const { ctx } = this;
    const users = UserService.user.find();

    ctx.body = {
      code: 0,
      message: 'success',
      data: users,
    };
  }
}
module.exports = UserController;

