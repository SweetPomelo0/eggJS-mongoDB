'use strict';

// module.exports = appInfo => {
//   const config = exports = {};

//   // use for cookie sign key, should change to your own and keep security
//   config.keys = appInfo.name + '_{{keys}}';

//   // add your config here
//   config.middleware = [];

//   // change to your own sequelize configurations
//   // config.sequelize = {
//   //   dialect: 'mysql',
//   //   host: 'localhost',
//   //   port: 3306,
//   //   database: 'egg-sequelize-default',
//   //   username: 'root',
//   //   password: '',
//   // };

//   return config;
// };

// {app_root}/config/config.default.js
exports.mongoose = {
  url: 'mongodb://127.0.0.1/example',
  options: {},
  // mongoose global plugins, expected a function or an array of function and options
  plugins: [createdPlugin, [updatedPlugin, pluginOptions]],
};
// recommended
exports.mongoose = {
  client: {
    url: 'mongodb://127.0.0.1/example',
    options: {},
    // mongoose global plugins, expected a function or an array of function and options
    plugins: [createdPlugin, [updatedPlugin, pluginOptions]],
  },
};
