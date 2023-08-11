const Service = require('egg').Service;
const crypto = require('crypto');

class sendEmailService extends Service {
  async sendEmail(account) {
    const { ctx } = this;
    // 要发送的收件人地址
    // const account = '864910436@qq.com'
    // 生成6位验证码
    const code = crypto.randomBytes(6).toString('hex'); // 生成随机的 6 位验证码
    // 定义模版
    const email = {
      title: '某某---邮箱验证码',
      body: `
                <h1>尊敬的用户</h1>
                <p style="font-size: 18px;color:#000;">
                您的验证码为：
                <span style="font-size: 20px;color:#f00;"> ${code}， </span>
                您当前正在某某网站注册账号，验证码告知他人将会导致数据信息被盗，请勿泄露
                </p>
                <p style="font-size: 1.5rem;color:#999;">该验证码5分钟内有效，请勿泄漏于他人！</p>
                `,
    };

    const emailContent = {
      from: '739304768@qq.com', // 发件人地址
      to: `${account}`, // 收件人地址，多个收件人可以使用逗号分隔
      subject: email.title, // 邮件标题
      html: email.body, // 邮件内容
    };

    try {
      await ctx.mail.send(emailContent);
      // 将验证码保存到 Redis，设置过期时间
      const redis = ctx.app.redis.get('client');
      await redis.set(`verification:${email}`, code, 'EX', 300); // 设置 5 分钟的过期时间
    } catch (error) {
      ctx.logger.error('Failed to send verification code email', error);
      throw new Error('Failed to send verification code email');
    }
  }
}
module.exports = sendEmailService;

