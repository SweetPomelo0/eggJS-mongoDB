const Controller = require('egg').Controller;

class sendController extends Controller {
  async sendVerificationCode() {
    const { ctx } = this;
    const { account } = ctx.request.body; // 获取邮箱地址
    const code = Math.floor(100000 + Math.random() * 900000); // 生成随机的 6 位验证码

    await ctx.service.sendMail.sendEmail(account, code);

    ctx.body = {
      code: 200,
      message: 'Verification code sent successfully. Please wait at least 60 seconds before sending another code.',
    };
  }
}

module.exports = sendController;

