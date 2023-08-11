const { app, assert } = require('egg-mock/bootstrap');

describe('TokenService', () => {
  it('should generate and save token in Redis', async () => {
    const ctx = app.mockContext();
    const tokenService = ctx.service.token;

    // Mock user ID
    const userId = '12345';

    // Generate and save token
    const secretKey = '780a6d530135ef8ca9889c942ac13b67108dfb6606e37bd491b8f4a07ccaf6c5'; // 直接写入密钥
    const token = await tokenService.generateToken(userId);
    await tokenService.saveTokenToRedis(userId, token);

    // Retrieve token from Redis
    const retrievedToken = await tokenService.getTokenFromRedis(userId);

    // Verify that the retrieved token matches the original token
    assert.strictEqual(retrievedToken, token);
  });

  // ... 其他测试 ...
});

