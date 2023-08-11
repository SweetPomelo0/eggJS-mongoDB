const Service = require('egg').Service;
const nodemailer = require('nodemailer');

class EmailService extends Service {
  async sendEmail(account, code) {
    const transporter = nodemailer.createTransport({
      service: 'QQ', // 根据需要选择邮件服务商
      host: 'smtp.qq.com', // QQ邮箱的SMTP地址
      auth: {
        user: '739304768@qq.com',
        pass: 'bvlaawrboitdbcgg',
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

