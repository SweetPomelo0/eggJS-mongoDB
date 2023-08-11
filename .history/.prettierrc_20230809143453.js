// .prettierrc.js

// 用途
// 配合eslint，检查代码规范

module.exports = {
  printWidth: 100, // 超出字符换行（默认：80）
  tabWidth: 2, // tab缩进字符（默认：2）
  proseWrap: 'preserve', // 超出字符换行方式，按原样显示（默认）
  useTabs: false, // 不使用tab缩进（默认：false）
  singleQuote: true, // 使用单引号
  semi: false, // 不使用分号
  trailingComma: 'none', // 不使用行尾逗号
  arrowParens: 'always', // 不省略括号（箭头函数）(x) => { x }
  bracketSpacing: true, // 对象中的空格，例如：{ foo：bar }（默认：true）
  quoteProps: 'as-needed', // 对象中的引号(仅在需要时在对象属性周围添加引号)
  jsxBracketSameLine: false, // JSX闭合标签换行显示(<div></div>)
  endOfLine: 'auto' // 换行符使用，保持现有的行尾设置（默认：auto）
}
