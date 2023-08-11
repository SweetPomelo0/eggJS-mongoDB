const Controller = require('egg').Controller;
class sendController extends Controller {
  // 发送邮件
  async sendSet() {
    const { ctx } = this;
    const { account } = ctx.request.body; // Get the account from the request body
    // 生成6位验证码
    const code = crypto.randomBytes(6).toString('hex'); // 生成随机的 6 位验证码
    await ctx.service.sendEmail.sendEmail(account, code);
    ctx.body = {
      code: 200,
      msg: result.msg,
    };
  }
}

module.exports = sendController;

