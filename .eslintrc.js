module.exports = {
  root: true,
  env: {
    browser: true,
    node: true
  },
  extends: ['eslint:recommended'],
  globals: {
    define: 'readonly'
  },
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module'
  },
  rules: {
    strict: 2,
    'newline-per-chained-call': 0,
    semi: ['error', 'never'],
    'comma-dangle': ['error', 'never'],
    'array-bracket-spacing': ['error', 'never'],
    'space-before-function-paren': ['error', 'never']
  }
}
