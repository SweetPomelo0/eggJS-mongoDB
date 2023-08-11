module.exports = {
  root: true,
  env: {
    node: true, //node环境
    es6: true, //注意es6环境使用到要加入
    browser: true, //浏览器环境
  },
  extends: [
    'eslint:recommended',
    'plugin:prettier/recommended', //加入这一行，这是官方推荐的引入方式
  ],
  parserOptions: {
    parser: 'babel-eslint',
  },
  rules: {
    //eslint规则...
    // quotes: "off",
    // "no-unused-vars": "error", // 开启没有用过的变量检测
    'arrow-parens': 0, // 要求箭头函数的参数使用圆括号
  },
};

