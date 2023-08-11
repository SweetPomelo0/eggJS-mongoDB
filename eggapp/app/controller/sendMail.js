const Controller = require('egg').Controller;

class sendController extends Controller {
  async sendVerificationCode() {
    const { ctx } = this;
    const { account } = ctx.request.body; // 获取邮箱地址

    // 使用 Redis 获取上次发送时间戳
    const lastSentTime = await ctx.app.redis.get(`lastSentTime:${account}`);
    const currentTime = Date.now();

    if (lastSentTime && currentTime - lastSentTime < 60000) {
      // 如果在60秒内尝试再次发送验证码，返回提示信息
      ctx.body = {
        code: 400,
        msg: 'Please wait at least 60 seconds before sending another verification code.',
      };
      return;
    }

    const code = Math.floor(100000 + Math.random() * 900000); // 生成随机的 6 位验证码

    await ctx.service.sendMail.sendEmail(account, code);

    ctx.body = {
      code: 200,
      message: 'Verification code sent successfully. Please wait at least 60 seconds before sending another code.',
    };
  }
}

module.exports = sendController;

