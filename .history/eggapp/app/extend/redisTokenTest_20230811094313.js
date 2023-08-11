const assert = require('assert');
const { app } = require('egg-mock/bootstrap');
const jwt = require('jsonwebtoken');

describe('Redis Token Storage Test', () => {
  it('should store and retrieve token from Redis', async () => {
    // Mock user ID and generate a sample JWT token
    const userId = '12345';
    const token = jwt.sign({ userId }, process.env.JWT_SECRET_KEY, { expiresIn: '7d' });

    // Store the token in Redis
    await app.redis.set(`userToken:${userId}`, token, 'EX', 60 * 60 * 24 * 7);

    // Retrieve the token from Redis
    const storedToken = await app.redis.get(`userToken:${userId}`);

    // Verify that the retrieved token matches the original token
    assert.strictEqual(storedToken, token);
  });

  it('should return null for non-existent token', async () => {
    // Mock user ID for a non-existent token
    const nonExistentUserId = '98765';

    // Retrieve a token from Redis for a non-existent user ID
    const storedToken = await app.redis.get(`userToken:${nonExistentUserId}`);

    // Verify that the retrieved token is null
    assert.strictEqual(storedToken, null);
  });
});

