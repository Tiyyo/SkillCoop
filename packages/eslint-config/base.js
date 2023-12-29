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
  plugins: ['@typescript-eslint', 'prettier'],
  rules: {
    'no-var': 'error',
    '@typescript-eslint/ban-ts-comment': 'off',
    semi: ['error', 'always'],
    'prettier/prettier': ['error', { semi: true }],
    indent: [
      2, // Rule severity (2 for error)
      2, // Indentation level (2 spaces)
      {
        SwitchCase: 1, // Indent case clauses by 1 level (or 2 spaces if indentation level is 2 spaces)
      },
    ],
    'no-multi-spaces': 'error',
    'max-len': ['error', { code: 80 }],
    'space-in-parens': 'error',
    'no-multiple-empty-lines': 'error',
    'typescript-eslint/ban-ts-comment': 'off',
    'import/extensions': ['off', 'always'],
    'linebreak-style': ['off', 'windows'],
  },
};
