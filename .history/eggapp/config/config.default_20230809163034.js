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

  // mongoose数据库配置
  config.mongoose = {
    url: 'mongodb://127.0.0.1:27021/momo', // 端口号27021数据库名VietNamVisa
    options: { useNewUrlParser: true, useUnifiedTopology: true }, // 其他配置警告解除方法
  };
  return {
    ...config,
    ...userConfig,
  };
};

