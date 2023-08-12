const Service = require('egg').Service;
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config();

class TokenService extends Service {
  async generateToken(userId) {
    const secretKey = process.env.JWT_SECRET_KEY; // 使用环境变量引用密钥;

    const token = jwt.sign({ userId }, secretKey, { expiresIn: '7d' });
    return token;
  }

  async saveTokenToRedis(userId, token) {
    const { app } = this;
    await app.redis.set(`userToken:${userId}`, token, 'EX', 60 * 60 * 24 * 7);
  }

  async getTokenFromRedis(userId) {
    const { app } = this;
    const token = await app.redis.get(`userToken:${userId}`);
    return token;
  }

  async deleteToken(userId) {
    const { app } = this;
    await app.redis.del(`userToken:${userId}`);
  }
}

module.exports = TokenService;

