const Service = require('egg').Service;
const crypto = require('crypto');

class MailService extends Service {
  async sendVerificationCode(email) {
    const { ctx, config } = this;
    const code = crypto.randomBytes(6).toString('hex'); // 生成随机的 6 位验证码

    const mailOptions = {
      from: config.email.sender, // 发件人邮箱
      to: email,
      subject: 'Email Verification Code',
      text: `Your verification code is: ${code}.It will be invalid in 5 minutes`,
    };

    try {
      await ctx.mailer.sendMail(mailOptions);
      // 将验证码保存到 Redis，设置过期时间
      const redis = ctx.app.redis.get('client');
      await redis.set(`verification:${email}`, code, 'EX', 300); // 设置 5 分钟的过期时间
    } catch (error) {
      ctx.logger.error('Failed to send verification code email', error);
      throw new Error('Failed to send verification code email');
    }
  }

  //测试Redis
  const Redis = require('ioredis');

// 获取 Redis 配置
const redisConfig = app.config.redis.client;

// 创建 Redis 客户端
const redis = new Redis(redisConfig);

// 测试连接
(async () => {
  try {
    await redis.ping();
    console.log('Successfully connected to Redis');
  } catch (error) {
    console.error('Failed to connect to Redis', error);
  } finally {
    redis.quit(); // 关闭连接
  }
})();

}

module.exports = MailService;

