const Service = require('egg').Service;
const nodemailer = require('nodemailer');
// const redis = require('egg-redis');

class EmailService extends Service {
  async sendEmail(account, code) {
    const { app } = this;
    const currentTime = Date.now();

    // 使用 Redis 获取上次发送时间戳
    const lastSentTime = await app.redis.get(`lastSentTime:${account}`);

    if (lastSentTime) {
      if (currentTime - lastSentTime < 60000) {
        throw new Error('Please wait at least 60 seconds before sending another verification code.');
      }
    }

    const transporter = nodemailer.createTransport({
      service: 'QQ', // 根据需要选择邮件服务商
      host: 'smtp.qq.com', // QQ邮箱的SMTP地址
      auth: {
        user: '739304768@qq.com',
        pass: 'bvlaawrboitdbcgg', // 授权码
      },
    });

    // 验证邮件服务
    try {
      await transporter.verify();
      console.log('邮件服务连接成功👏');
    } catch (err) {
      console.error('邮件服务连接失败', err);
      throw err;
    }

    const mailOptions = {
      from: '739304768@qq.com', // 发件人地址
      to: account, // 收件人地址
      subject: '邮箱验证码', // 邮件标题
      html: `<p>您的验证码为：${code}</p>`, // 邮件内容
    };

    try {
      await transporter.sendMail(mailOptions);

      // // 验证邮件服务
      // transporter.verify(err => {
      //   if (err) console.log('邮件服务连接失败', err);
      //   else console.log('邮件服务连接成功👏');
      // });

      // 在邮件发送成功后，更新上次发送时间戳
      await app.redis.set(`createTime:${account}`, currentTime);

      // 在邮件发送成功后，写入验证码和创建时间到 Redis
      const redisKey = `verification:${account}`;
      // const redisValue = JSON.stringify({ code, lastSentTime: new Date() });
      const redisValue = JSON.stringify({ code, createTime: Date.now() });

      await app.redis.set(redisKey, redisValue, 'EX', 300); // 5分钟过期
    } catch (error) {
      this.ctx.logger.error('Failed to send verification code email', error);
      throw new Error('Failed to send verification code email');
    }
  }
}

module.exports = EmailService;

