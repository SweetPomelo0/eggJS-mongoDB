// const Service = require('egg').Service;
// const crypto = require('crypto');

// class sendEmailService extends Service {
//   async sendEmail(account) {
//     const { ctx, app } = this;
//     const code = crypto.randomBytes(6).toString('hex'); // 生成随机的 6 位验证码

//     const mailOptions = {
//       from: '739304768@qq.com',
//       to: account,
//       subject: '邮箱验证',
//       html: `
//          <h1>尊敬的用户</h1>
//          您的验证码为： ${code} , 您当前正在某某网站注册账号，验证码告知他人将会导致数据信息被盗，请勿泄露
//          该验证码5分钟内有效 请勿泄漏于他人！`,
//     };

//     app.email.sendMail(mailOptions, (error, response) => {
//       if (error) {
//         console.log('error:', error);
//       } else {
//         console.log('email sent: ' + response.message);
//       }
//       app.email.close();
//     });

//     //   try {
//     //     ctx.body = await app.email.sendEmail(mailOptions);
//     //     console.log(account);
//     //     // await this.app.sendEmail(emailContent);
//     //     // // 将验证码保存到 Redis，设置过期时间
//     //     // const redisClient = ctx.app.redis.get('client');
//     //     // await redisClient.set(`verification:${account}`, code, 'EX', 300); // 设置 5 分钟的过期时间
//     //   } catch (error) {
//     //     ctx.logger.error('Failed to send verification code email', error);
//     //     throw new Error('Failed to send verification code email');
//     //   }
//     // }
//   }
// }
// module.exports = sendEmailService;

const Service = require('egg').Service;
const nodemailer = require('nodemailer');

class EmailService extends Service {
  async sendEmail(account, code) {
    const transporter = nodemailer.createTransport({
      service: 'QQ', // 根据需要选择邮件服务商
      auth: {
        user: '739304768@qq.com',
        pass: 'your-email-password',
      },
    });

    const mailOptions = {
      from: '739304768@qq.com', // 发件人地址
      to: account, // 收件人地址
      subject: '邮箱验证码', // 邮件标题
      html: `<p>您的验证码为：${code}</p>`, // 邮件内容
    };

    try {
      await transporter.sendMail(mailOptions);
    } catch (error) {
      this.ctx.logger.error('Failed to send verification code email', error);
      throw new Error('Failed to send verification code email');
    }
  }
}

module.exports = EmailService;

