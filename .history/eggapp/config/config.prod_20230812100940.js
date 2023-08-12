/* eslint valid-jsdoc: "off" */

'use strict';

/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = appInfo => {
  /**
   * built-in config
   * @type {Egg.EggAppConfig}
   **/
  const config = (exports = {});

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1691559301559_8861';

  // add your middleware config here
  config.middleware = [];

  // add your user config here
  const userConfig = {
    // myAppName: 'egg',
  };

  config.security = {
    csrf: {
      enable: false,
    },
  };

  cluster: {
    listen: {
      port: 7001, // 根据需要设置不同的端口
    },

  // // mongoose数据库配置
  // config.mongoose = {
  //   url: 'mongodb://127.0.0.1:27017/momo', // 端口号27017数据库名momo
  //   options: { useNewUrlParser: true, useUnifiedTopology: true }, // 其他配置警告解除方法
  // };

  config.jwt = {
    secret: 'admin',
  };

  // // Redis数据库配置
  // config.redis = {
  //   client: {
  //     port: 6379, // Redis port
  //     host: '127.0.0.1', // Redis host
  //     password: '123456',
  //     db: 0,
  //   },
  // };

  //Docker
  // mongoose数据库配置
  config.mongoose = {
    host: 'egg-mongoose',
    database: 'momo',
    options: { useNewUrlParser: true, useUnifiedTopology: true }, // 其他配置警告解除方法
  };

  // Redis数据库配置
  config.redis = {
    client: {
      port: 6379, // Redis port
      host: 'egg-redis', // Redis host
      password: '', // 如果有密码，这里填写 Redis 密码
      db: 0, // 如果需要指定数据库索引，可以在这里设置
    },
  };

  // ...

  return {
    ...config,
    ...userConfig,
  };
};
