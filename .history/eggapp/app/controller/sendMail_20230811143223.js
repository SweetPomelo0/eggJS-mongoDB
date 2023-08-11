const Controller = require('egg').Controller;

class sendController extends Controller {
  async sendVerificationCode() {
    const { ctx } = this;
    const { account } = ctx.request.body; // 获取邮箱地址

    // 使用 Redis 获取上次发送时间戳
    const lastSentTime = await ctx.app.redis.get(`lastSentTime:${account}`);
    const currentTime = Date.now();

    // 获取发送次数
    const sentCount = await ctx.app.redis.get(`sentCount:${account}`);

    // 如果在60秒内尝试再次发送验证码，返回提示信息
    if (lastSentTime && currentTime - lastSentTime < 60000) {
      ctx.body = {
        code: 400,
        msg: '请等待至少60秒后再发送验证码',
      };
      return;
    }

    // 判断发送次数是否过多
    if (sentCount && parseInt(sentCount) >= 5) {
      ctx.body = {
        code: 400,
        msg: '请求频繁，请稍后再试',
      };
      return;
    }

    const code = Math.floor(100000 + Math.random() * 900000); // 生成随机的6位验证码

    await ctx.service.sendMail.sendEmail(account, code);

    // 更新发送次数和发送时间
    await ctx.app.redis.set(`sentCount:${account}`, sentCount ? parseInt(sentCount) + 1 : 1, 'EX', 3600);
    await ctx.app.redis.set(`lastSentTime:${account}`, currentTime);

    ctx.body = {
      code: 200,
      message: '验证码发送成功,请等待至少60秒后再发送',
    };
  }
}

module.exports = sendController;

