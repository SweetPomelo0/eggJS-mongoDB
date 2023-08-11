module.exports = {
  root: true,
  env: {
      node: true,//node环境
      es6: true, //注意es6环境使用到要加入
      browser: true,//浏览器环境
  },
  extends: [
      "eslint:recommended",
  ],
  parserOptions: {
      parser: "babel-eslint",
  },
  rules: {
      //eslint规则...
  }
}
