// app/controller/sendEmail.js

'use strict';

const Controller = require('egg').Controller;
class sendController extends Controller {

  // 发送邮件
  async send() {
    const { ctx } = this;
    const result = await ctx.service.sendEmail();
    ctx.body={
	code:result.code,
	msg:result.msg
  }

}

module.exports = sendController;

