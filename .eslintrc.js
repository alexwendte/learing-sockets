module.exports = {
  extends: [
    'eslint:recommended',
    'airbnb-base',
    'plugin:@typescript-eslint/recommended',
    'prettier',
    'prettier/@typescript-eslint'
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: './tsconfig.json',
    ecmaVersion: 2018,
    sourceType: 'module'
  },
  plugins: ['@typescript-eslint', 'jest'],
  env: {
    'jest/globals': true
  },
  rules: {
    'no-use-before-define': 0,
    'sort-keys': ['error', 'asc', { caseSensitive: true, natural: true }],
    'object-shorthand': ['error', 'always'],
    'no-param-reassign': ['error', { props: false }],
    'consistent-return': 1,
    'no-plusplus': 0,
    '@typescript-eslint/interface-name-prefix': 0,
    '@typescript-eslint/no-use-before-define': 0,
    '@typescript-eslint/camelcase': 0,
    '@typescript-eslint/explicit-function-return-type': 0,
    '@typescript-eslint/no-explicit-any': 0,
    'import/prefer-default-export': 0
  },
  settings: {
    'import/resolver': {
      node: {
        extensions: ['.js', '.jsx', '.ts', '.tsx']
      }
    }
  }
};
