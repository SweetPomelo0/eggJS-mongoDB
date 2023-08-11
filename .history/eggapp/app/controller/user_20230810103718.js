const Controller = require('egg').Controller;
const utility = require('utility');
class UserController extends Controller {
  /**
   * 获取用户列表
   */
  async getUserList() {
    const { ctx } = this;
    const users = await ctx.service.user.findAll();

    ctx.body = {
      code: 0,
      message: 'success',
      data: users,
    };
  }
  /**
   * 注册
   */
  async register() {
    const { ctx } = this;
    // const body = Object.assign({}, ctx.request.body);
    // // 1.调用查找服务，查询邮箱是否被注册
    // const user = await ctx.service.user.find(body);
    // if (user && user.email) {
    //   ctx.body = {
    //     code: 0,
    //     data: null,
    //     msg: '邮箱已被注册',
    //   };
    //   return;
    // }
    // body.password = utility.md5(body.password);
    // // 2.邮箱不存在的话，注册账号
    // const res = await ctx.service.user.create(body);
    // ctx.body = {
    //   code: 0,
    //   data: res,
    //   msg: '注册成功',
    // };
    const req = ctx.request.body;
    const res = await ctx.service.user.createUser(req);
    ctx.body = {
      code: 0,
      data: res,
      msg: 'success',
    };
  }

  // jwt登录，返回token
  async login() {
    // const { ctx, app } = this;
    // const body = Object.assign({}, ctx.request.body);
    // // 1.根据邮箱，查找账号是否存在
    // const user = await ctx.service.user.find(body);
    // if (user && user.password === utility.md5(body.password)) {
    //   // 2.密码正确，将通过jwt插件生成token，返回给前端
    //   const token = app.jwt.sign({ username: body.username }, app.config.jwt.secret, {
    //     expiresIn: '1h',
    //   });
    //   ctx.body = {
    //     code: 0,
    //     data: {
    //       token,
    //       username: body.username,
    //     },
    //     msg: '登录成功',
    //   };
    //   return;
    // }
    // ctx.body = {
    //   code: 0,
    //   data: null,
    //   msg: '邮箱或密码错误',
    // };
    const { ctx } = this;
    const req = ctx.request.body;
    const res = await ctx.service.user.find(req);
    console.log(res);
    if (res) {
      ctx.body = {
        code: 0,
        data: {
          email: req.email,
          password: req.password,
        },
        msg: 'login success',
      };
    } else {
      ctx.body = {
        code: 0,
        data: {
          email: req.email,
          password: req.password,
          password1: res.password || '1',
        },
        msg: 'login fail',
      };
    }
  }
}
module.exports = UserController;

