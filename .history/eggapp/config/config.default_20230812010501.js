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

  // // mongoose数据库配置
  // config.mongoose = {
  //   url: 'mongodb://127.0.0.1:27017/momo', // 端口号27017数据库名momo
  //   options: { useNewUrlParser: true, useUnifiedTopology: true }, // 其他配置警告解除方法
  // };

  // config.jwt = {
  //   secret: 'admin',
  // };

  // // Redis数据库配置
  // config.redis = {
  //   client: {
  //     port: 6379, // Redis port
  //     host: '127.0.0.1', // Redis host
  //     password: '123456',
  //     db: 0,
  //   },
  // };

  // mongoose数据库配置
  config.mongoose = {
    host: 'db',
    database: 'momo',
    options: { useNewUrlParser: true, useUnifiedTopology: true }, // 其他配置警告解除方法
  };

  config.jwt = {
    secret: 'admin',
  };

  // Redis数据库配置
  config.redis = {
    client: {
      port: 6379, // Redis port
      host: redis, // Redis host
      // password: '123456',
      db: 0,
    },
  };

  // ...

  return {
    ...config,
    ...userConfig,
  };
};

