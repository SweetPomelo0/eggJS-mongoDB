const Controller = require('egg').Controller;
const bcrypt = require('bcryptjs');
// const utility = require('utility');
class UserController extends Controller {
  /**
   * 获取用户列表-测试
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
   * 查询自己用户信息
   */
  async getCurrentUserList() {
    const { ctx } = this;
    const req = ctx.request.body;

    const currentUser = await ctx.service.user.findByEmail(req.email);

    if (currentUser) {
      ctx.body = {
        code: 0,
        data: currentUser,
        message: 'query success',
      };
    } else {
      ctx.body = {
        code: 404,
        message: 'User not found',
      };
    }
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
        message: 'Invalid email format',
      };
      return;
    }

    // 检查邮箱是否已经注册
    const existingUser = await ctx.service.user.findByEmail(req.email);
    if (existingUser) {
      ctx.body = {
        code: 400,
        message: 'Email already registered',
      };
      return;
    }

    // // 验证密码长度，密码不合法返回相应错误信息
    // if (req.password.length < 8) {
    //   ctx.body = {
    //     code: 400,
    //     message: 'Password must be at least 8 characters long',
    //   };
    //   return;
    // }

    // 执行注册逻辑
    const res = await ctx.service.user.createUser(req);
    // const token = await ctx.service.token.generateToken(req.email);
    const userId = req.email;
    const token = await tokenService.generateToken(userId);
    await ctx.service.tokenService.saveTokenToRedis(userId, token);

    // Retrieve token from Redis
    const retrievedToken = await ctx.service.tokenService.getTokenFromRedis(userId);

    ctx.body = {
      code: 0,
      data: res,
      message: 'register success',
      token,
      redisToken: retrievedToken,
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
      // 校验密码是否正确
      if (isPasswordValid) {
        ctx.body = {
          code: 0,
          message: 'login success',
        };
      } else {
        ctx.body = {
          code: 0,
          message: 'error password',
        };
      }
    } else {
      // 用户邮箱不存在，提示注册
      ctx.body = {
        code: 0,
        message: 'email not existing , please register.',
      };
    }
  }
}
module.exports = UserController;

