const Controller = require('egg').Controller;
const utility = require('utility');
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
    // 1.调用查找服务，查询邮箱是否被注册
    const user = await ctx.service.user.find(body);
    if (user && user.email) {
      ctx.body = {
        code: 0,
        data: null,
        msg: '邮箱已被注册',
      };
      return;
    }
    body.password = utility.md5(body.password);
    // 2.邮箱不存在的话，注册账号
    const res = await ctx.service.user.create(body);
    ctx.body = {
      code: 0,
      data: res,
      msg: '注册成功',
    };
  }
}
module.exports = UserController;

