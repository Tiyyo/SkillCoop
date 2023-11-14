module.exports = {
  root: true,
  env: {
    browser: true,
    es2020: true,
    node: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended',
  ],
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint'],
  rules: {
    'no-var': 'error',
    '@typescript-eslint/ban-ts-comment': 'off',
    semi: 'error',
    'prettier/prettier': ['error', { semi: true }],
    indent: [
      'off',
      2,
      {
        SwitchCase: 1,
      },
    ],
    'no-multi-spaces': 'error',
    'max-len': [
      'error',
      {
        code: 100,
      },
    ],
    'space-in-parens': 'error',
    'no-multiple-empty-lines': 'error',
    'typescript-eslint/ban-ts-comment': 'off',
    'import/extensions': ['off', 'always'],
    'linebreak-style': ['off', 'windows'],
  },
};
