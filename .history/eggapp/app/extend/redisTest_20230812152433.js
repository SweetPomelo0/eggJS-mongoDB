// 测试Redis
const Redis = require('ioredis');

// 创建 Redis 客户端
const redis = new Redis({
  host: '127.0.0.1', // Redis 主机地址
  port: 6379, // Redis 端口
  password: '123456', // Redis 密码（如果有的话）
  db: 0, // 数据库索引
});

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

async function linkRedis() {
  try {
    await redis.ping();
    console.log('Successfully connected to Redis');
  } catch (error) {
    console.error('Failed to connect to Redis', error);
  } finally {
    redis.quit(); // 关闭连接
  }
}
linkRedis();

