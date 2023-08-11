// app/service/sendEmail.js


'use strict';

const Service = require('egg').Service;

class sendEmailService extends Service {

  async sendEmail(account) {
    const { app, ctx } = this;
    //要发送的收件人地址
    const account = '864910436@qq.com'
    // 生成6位验证码
    const code = ctx.helper.rand(6); // 该辅助方法在extend/helper.js中定义
    // 定义模版
    const email = {
      title: '某某网---邮箱验证码',
      body: `
                <h1>尊敬的:${account}用户</h1>
                <p style="font-size: 18px;color:#000;">
                您的验证码为：
                <span style="font-size: 20px;color:#f00;"> ${code}， </span>
                您当前正在某某网站注册账号，验证码告知他人将会导致数据信息被盗，请勿泄露
                </p>
                <p style="font-size: 1.5rem;color:#999;">该验证码5分钟内有效，请勿泄漏于他人！</p>
                `,
    };

    const emailCotent = {
      from: '877880098@qq.com', // 发件人地址
      to: `${account}`, // 收件人地址，多个收件人可以使用逗号分隔
      subject: email.title, // 邮件标题
      html: email.body, // 邮件内容
    };

    return await ctx.helper.sendEmail(emailCotent);// 该辅助方法在extend/helper.js中定义


  }

module.exports = sendEmailService;

