const Controller = require('egg').Controller;
const bcrypt = require('bcryptjs');
// const utility = require('utility');
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
    const req = ctx.request.body;

    // 验证邮箱格式
    if (!ctx.service.user.isValidEmail(req.email)) {
      ctx.body = {
        code: 400,
        msg: 'Invalid email format',
      };
      return;
    }

    // 检查邮箱是否已经注册
    const existingUser = await ctx.service.user.findByEmail(req.email);
    if (existingUser) {
      ctx.body = {
        code: 400,
        msg: 'Email already registered',
      };
      return;
    }

    // // 验证密码长度
    // if (req.password.length < 8) {
    //   ctx.body = {
    //     code: 400,
    //     msg: 'Password must be at least 8 characters long',
    //   };
    //   return;
    // }

    // 执行注册逻辑
    const res = await ctx.service.user.createUser(req);
    ctx.body = {
      code: 0,
      data: res,
      msg: 'success',
    };
  }

  // 登录，返回token
  async login() {
    const { ctx } = this;
    const req = ctx.request.body;
    // 检查邮箱是否已经注册
    const existingUser = await ctx.service.user.findByEmail(req.email);
    if (existingUser) {
      const isPasswordValid = bcrypt.compareSync(req.password, existingUser.password);
      if (isPasswordValid) {
        ctx.body = {
          code: 0,
          // data: {
          //   email: req.email,
          //   password: req.password,
          //   password1: existingUser.password,
          // },
          msg: 'login success',
        };
      } else {
        ctx.body = {
          code: 0,
          msg: 'error password',
        };
      }

      // return;
    } else {
      ctx.body = {
        code: 0,
        // data: {
        //   email: req.email,
        // },
        msg: 'email not existing',
      };
    }
  }

  /**
   * 发送验证码
   */
  async sendVerificationCode() {
    const { ctx } = this;
    const { email } = ctx.request.body;
    console.log(email);

    try {
      await ctx.service.mail.sendVerificationCode(email);
      ctx.status = 200;
      ctx.body = { message: 'Verification code sent successfully' };
    } catch (error) {
      ctx.status = 500;
      ctx.body = { message: 'An error occurred while sending verification code' };
    }
  }
}
module.exports = UserController;

