module.exports = {
  env: {
    es2021: true,
    node: true
  },
  extends: ['eslint:recommended', 'plugin:@typescript-eslint/recommended'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module'
  },
  plugins: ['@typescript-eslint', 'prettier'],
  rules: {
    yoda: 'error',
    eqeqeq: 'error',
    'one-var': 'warn',
    camelcase: 'error',
    complexity: 'error',
    'no-console': 'warn',
    'prefer-const': 'error',
    'prefer-template': 'error',
    'object-shorthand': 'warn',
    'prettier/prettier': 'warn',
    'prefer-destructuring': 'warn',
    'prefer-arrow-callback': 'error'
  }
};
