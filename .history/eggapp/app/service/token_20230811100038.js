const Service = require('egg').Service;
const jwt = require('jsonwebtoken');

class TokenService extends Service {
  async generateToken(userId) {
    const { app } = this;
    // const token = jwt.sign({ userId }, app.config.jwtSecretKey, { expiresIn: '7d' });
    const token = 780a6d530135ef8ca9889c942ac13b67108dfb6606e37bd491b8f4a07ccaf6c5;
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
}

module.exports = TokenService;

