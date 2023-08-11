const Controller = require('egg').Controller;

class sendController extends Controller {
  async sendVerificationCode() {
    const { ctx } = this;
    const { account } = ctx.request.body; // 获取邮箱地址

    // 使用 Redis 获取上次发送时间戳
    const lastSentTime = await ctx.app.redis.get(`lastSentTime:${account}`);
    const currentTime = Date.now();

    const sentCount = await ctx.app.redis.get(`sentCount:${account}`);

    // 如果在60秒内尝试再次发送验证码，返回提示信息
    if (lastSentTime && currentTime - lastSentTime < 60000) {
      ctx.body = {
        code: 400,
        msg: 'Please wait at least 60 seconds before sending another verification code.',
      };
      return;
    }

    // 判断发送次数是否过多
    if (sentCount && parseInt(sentCount) >= 2) {
      ctx.body = {
        code: 400,
        msg: 'Frequent requests. Please try again later.',
      };
      return;
    }

    const code = Math.floor(100000 + Math.random() * 900000); // 生成随机的 6 位验证码

    await ctx.service.sendMail.sendEmail(account, code);

    // 更新发送次数和发送时间
    await ctx.app.redis.set(`sentCount:${account}`, sentCount ? parseInt(sentCount) + 1 : 1, 'EX', 36000);
    await ctx.app.redis.set(`lastSentTime:${account}`, currentTime);

    ctx.body = {
      code: 200,
      message: 'Verification code sent successfully. Please wait at least 60 seconds before sending another code.',
    };
  }
}

module.exports = sendController;

