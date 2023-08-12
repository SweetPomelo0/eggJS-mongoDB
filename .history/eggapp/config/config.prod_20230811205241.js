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

  // 生产环境
  // mongoose数据库配置
  config.mongoose = {
    host: 'mongo',
    url: 'mongo://momo',
    options: { useNewUrlParser: true, useUnifiedTopology: true }, // 其他配置警告解除方法
  };

  config.jwt = {
    secret: 'admin',
  };

  // Redis数据库配置
  config.redis = {
    client: {
      port: 6379, // Redis port
      host: 'redis', // 使用容器名作为主机名
      password: '',
      db: 0,
    },
  };

  // ...

  return {
    ...config,
    ...userConfig,
  };
};

