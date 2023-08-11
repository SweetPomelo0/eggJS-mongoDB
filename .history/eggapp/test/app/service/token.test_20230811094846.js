const assert = require('assert');
const { app } = require('egg-mock/bootstrap');
const jwt = require('jsonwebtoken');

describe('Token Redis Storage Test', () => {
  it('should store token in Redis and retrieve it', async () => {
    const ctx = app.mockContext();
    const tokenService = ctx.service.token;

    // Mock user ID
    const userId = '12345';

    // Generate a sample JWT token
    const token = jwt.sign({ userId }, process.env.JWT_SECRET_KEY, { expiresIn: '7d' });

    // Store the token in Redis
    await tokenService.saveTokenToRedis(userId, token);

    // Retrieve the token from Redis
    const retrievedToken = await tokenService.getTokenFromRedis(userId);

    // Verify that the retrieved token matches the original token
    assert.strictEqual(retrievedToken, token);
  });

  it('should return null for non-existent token', async () => {
    const ctx = app.mockContext();
    const tokenService = ctx.service.token;

    // Mock user ID for a non-existent token
    const nonExistentUserId = '98765';

    // Retrieve a token from Redis for a non-existent user ID
    const retrievedToken = await tokenService.getTokenFromRedis(nonExistentUserId);

    // Verify that the retrieved token is null
    assert.strictEqual(retrievedToken, null);
  });
});

