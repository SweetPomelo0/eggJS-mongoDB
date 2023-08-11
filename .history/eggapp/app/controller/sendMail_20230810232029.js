const Controller = require('egg').Controller;

class sendController extends Controller {
  async sendVerificationCode() {
    const { ctx } = this;
    const { account } = ctx.request.body; // 获取邮箱地址
    const code = Math.floor(100000 + Math.random() * 900000); // 生成随机的 6 位验证码

    try {
      await ctx.service.email.sendEmail(account, code);

      ctx.body = {
        code: 200,
        msg: 'Verification code email sent successfully. Please wait at least 60 seconds before sending another code.',
      };
    } catch (error) {
      ctx.body = {
        code: 500,
        msg: 'Failed to send verification code email.',
      };
    }
  }
}

module.exports = sendController;

