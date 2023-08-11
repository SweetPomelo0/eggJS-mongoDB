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

  // mongoose数据库配置
  config.mongoose = {
    url: 'mongodb://127.0.0.1:27017/momo', // 端口号27017数据库名momo
    options: { useNewUrlParser: true, useUnifiedTopology: true }, // 其他配置警告解除方法
  };

  config.jwt = {
    secret: 'admin',
  };

  // Redis数据库配置
  config.redis = {
    client: {
      port: 6379, // Redis port
      host: '127.0.0.1', // Redis host
      password: '123456',
      db: 0,
    },
  };

  // // 邮件
  // config.email = {
  //   user: 'alexandra0507@163.com',
  //   password: 'NRMNQFZRMFNMFHJP',
  //   host: 'smtp.163.com',
  //   sender: 'alexandra0507@163.com',
  // };
  // app/config/config.default.js

  // qq邮箱配置
  config.qqEmail = {
    host: 'smtp.qq.com', // QQ邮箱的SMTP地址
    port: 465, // 邮箱的端口号一般都使用465，
    auth: {
      user: '877880098@qq.com', // 你自己的邮箱的邮箱地址
      pass: 'lelsutwwbhg', // 授权码
    },
  };

  // ...

  return {
    ...config,
    ...userConfig,
  };
};

