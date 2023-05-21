module.exports = {
  env: {
    browser: false,
    node: true,
    es2021: true
  },
  extends: [
    'standard-with-typescript'
  ],
  overrides: [
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: ['tsconfig.json']
  },
  rules: {
    'import/extensions': 'off',
    'import/no-unresolved': 'off',
    'class-methods-use-this': 'warn',
    'import/prefer-default-export': 'off',
    '@typescript-eslint/explicit-function-return-type': 'off'
  }
}
