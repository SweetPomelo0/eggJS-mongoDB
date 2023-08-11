const Service = require('egg').Service;
const crypto = require('crypto');

class sendEmailService extends Service {
  async sendEmail(account, code) {
    const { ctx } = this;
    // 要发送的收件人地址
    // const account = '864910436@qq.com'
    // 生成6位验证码
    const code = crypto.randomBytes(6).toString('hex'); // 生成随机的 6 位验证码

    const emailContent = {
      from: '739304768@qq.com', // 发件人地址
      to: account, // 收件人地址，多个收件人可以使用逗号分隔
      subject: 'Email Verification Code', // 邮件标题
      text: `Your verification code is: ${code}`,
    };

    try {
      await ctx.mailer.sendEmail(emailContent);
      // // 将验证码保存到 Redis，设置过期时间
      // const redisClient = ctx.app.redis.get('client');
      // await redisClient.set(`verification:${account}`, code, 'EX', 300); // 设置 5 分钟的过期时间
    } catch (error) {
      ctx.logger.error('Failed to send verification code email', error);
      throw new Error('Failed to send verification code email');
    }
  }
}
module.exports = sendEmailService;

