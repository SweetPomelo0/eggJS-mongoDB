const Controller = require('egg').Controller;
const bcrypt = require('bcryptjs');

class UserController extends Controller {
  /**
   * 获取用户列表-测试
   */
  async getUserList() {
    const { ctx } = this;
    const users = await ctx.service.user.findAll();

    ctx.body = {
      code: 200,
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
        code: 200,
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

    // 验证密码长度，密码不合法返回相应错误信息
    if (req.password.length < 8) {
      ctx.body = {
        code: 400,
        message: 'Password must be at least 8 characters long',
      };
      return;
    }

    // 执行注册逻辑
    const res = await ctx.service.user.createUser(req);

    // 生成 Token 并保存到 Redis
    const userId = req.email;
    const token = await ctx.service.token.generateToken(userId);
    await ctx.service.token.saveTokenToRedis(userId, token);

    // 从 Redis 中获取 Token
    // const retrievedToken = await ctx.service.token.getTokenFromRedis(userId);

    ctx.body = {
      code: 200,
      data: res,
      message: 'register success',
      token,
    };
  }

  /**
   * 登录，返回token
   */
  async login() {
    const { ctx } = this;
    const req = ctx.request.body;
    // 检查邮箱是否已经注册
    const existingUser = await ctx.service.user.findByEmail(req.email);
    if (existingUser) {
      const isPasswordValid = bcrypt.compareSync(req.password, existingUser.password);

      // 校验密码是否正确
      if (isPasswordValid) {
        // 生成 Token 并保存到 Redis
        const userId = existingUser.email;
        const token = await ctx.service.token.generateToken(userId);
        ctx.body = {
          code: 200,
          message: 'login success',
          token,
        };
        return;
      } else {
        ctx.body = {
          code: 400,
          message: 'error password',
        };
        return;
      }
    } else {
      // 用户邮箱不存在，提示注册
      ctx.body = {
        code: 400,
        message: 'email not existing , please register.',
      };
      return;
    }
  }

  /**
   * 修改密码
   */
  async resetPassword() {
    const { ctx, app } = this;
    const { email, code, newPassword } = ctx.request.body;

    const redisKey = `verification:${email}`;
    const redisValue = await app.redis.get(redisKey);

    if (redisValue) {
      const savedData = JSON.parse(redisValue);
      const savedCode = savedData.code;

      // if (savedCode === parseInt(code)) {
      if (savedCode.toString() === code) {
        await ctx.service.user.updatePasswordByEmail(email, newPassword);

        ctx.body = {
          code: 200,
          message: 'Password reset successfully.',
        };
        return;
      } else {
        ctx.body = {
          code: 400,
          message: 'Invalid verification code.',
        };
        return;
      }
    } else {
      ctx.body = {
        code: 200,
        message: 'Verification code not found. Please request a new code.',
      };
      return;
    }
  }

  /**
   * 忘记密码
   */
  async forgetPassword() {
    const { ctx, app } = this;
    const { email, code, newPassword } = ctx.request.body;

    const redisKey = `verification:${email}`;
    const redisValue = await app.redis.get(redisKey);

    if (redisValue) {
      const savedData = JSON.parse(redisValue);
      const savedCode = savedData.code;

      // if (savedCode === parseInt(code)) {
      if (savedCode.toString() === code) {
        // 重置密码成功后删除用户的 token
        const userId = email; // 假设你的用户标识是邮箱
        await ctx.service.token.deleteToken(userId);
        await ctx.service.user.updatePasswordByEmail(email, newPassword);

        ctx.body = {
          code: 200,
          message: 'Password reset successfully.',
        };
        return;
      } else {
        ctx.body = {
          code: 200,
          message: 'Invalid verification code.',
        };
        return;
      }
    } else {
      ctx.body = {
        code: 200,
        message: 'Verification code not found. Please request a new code.',
      };
      return;
    }
  }
}
module.exports = UserController;

