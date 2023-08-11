const Service = require('egg').Service;
const crypto = require('crypto');

class sendEmailService extends Service {
  async sendEmail(account) {
    const { ctx, app } = this;
    // 要发送的收件人地址
    // const account = '864910436@qq.com'
    const code = crypto.randomBytes(6).toString('hex'); // 生成随机的 6 位验证码
    // // 定义模版
    // const email = {
    //   title: '邮箱验证',
    //   body: `
    //   <h1>尊敬的用户</h1>
    //   您的验证码为： ${code} , 您当前正在某某网站注册账号，验证码告知他人将会导致数据信息被盗，请勿泄露
    //   该验证码5分钟内有效 请勿泄漏于他人！`,
    // };

    const message = {
      title: '邮箱验证',
      info: '尊敬的用户，您的验证码为' + code + '您当前正在某某网站注册账号，验证码告知他人将会导致数据信息被盗，请勿泄露',
      reciver: '3471612848@qq.com',
      attachment: null,
    };

    try {
      ctx.body = await app.email.sendEmail(message);
      console.log(account);
      // await this.app.sendEmail(emailContent);
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

