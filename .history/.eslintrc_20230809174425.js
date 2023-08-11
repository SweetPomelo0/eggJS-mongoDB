module.exports = {
  root: true,
  env: {
    node: true, //node环境
    es6: true, //注意es6环境使用到要加入
    browser: true //浏览器环境
  },

  extends: [
    'eslint:recommended',
    'plugin:prettier/recommended' //加入这一行，这是官方推荐的引入方式
    // "extends": ["eslint:recommended", "standard",  "plugin:prettier/recommended"]
  ],
  parserOptions: {
    parser: 'babel-eslint'
  },
  rules: {
    //规则...
    // 'comma-dangle': 0,
    'trailing-comma': false
  }
};

