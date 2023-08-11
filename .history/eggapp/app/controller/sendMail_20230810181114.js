const Controller = require('egg').Controller;
class sendController extends Controller {
  // 发送邮件
  async sendSet() {
    const { ctx } = this;
    const result = await ctx.service.sendMail.sendEmail();
    ctx.body = {
      code: result.code,
      msg: result.msg,
    };
  }
}

module.exports = sendController;

