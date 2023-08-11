const Controller = require('egg').Controller;

class UserController extends Controller {
  // /**
  //  * 获取用户列表
  //  */
  // async getUserList() {
  //   const { ctx, service } = this;
  //   // const users = service.user.find();
  //   const users = await service.user.find();

  //   ctx.body = {
  //     code: 0,
  //     message: 'success',
  //     data: users,
  //   };
  // }
  /**
   * 注册
   */
  async register() {
    const { ctx } = this;
    const body = Object.assign({}, ctx.request.body);
  }
}
module.exports = UserController;

