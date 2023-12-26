module.exports = {
  root: true,
  env: {
   node: true,
  },
  extends: ['plugin:react/react-essential', 'eslint:recommended', '@react/standard', '@react/prettier'], // "@vue/prettier"
  parserOptions: {
   parser: 'babel-eslint',
  },
  rules: {
   'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
   'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
   'react/no-multiple-template-root': 'off',
  },
}