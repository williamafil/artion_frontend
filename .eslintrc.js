module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: ['plugin:vue/essential', '@vue/airbnb'],
  parserOptions: {
    parser: 'babel-eslint',
  },
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'max-len': [
      'error',
      {
        code: 250,
        ignoreComments: true,
        ignoreUrls: true,
      },
    ],
    'import/prefer-default-export': 'off',
    'object-curly-newline': 'off',
    'no-confusing-arrow': ['error', { allowParens: true }],
    // 'operator-linebreak': [
    //   'error',
    //   'after',
    //   {
    //     overrides: {
    //       ':': 'before',
    //     },
    //   },
    // ],
    // 'operator-linebreak': [2, 'before', { overrides: { '?': 'before', ':': 'before' } }],
    'operator-linebreak': [
      2,
      'after',
      {
        overrides: {
          '?': 'before',
          ':': 'before',
        },
      },
    ],
    // 'operator-linebreak': [2, 'before', { overrides: { '?': 'after', '+=': 'none' } }],
    // 'vue/no-parsing-error': [
    //   'error',
    //   {
    //     'control-character-in-input-stream': true,
    //   },
    // ],
    // 'comma-dangle': [
    //   'error',
    //   {
    //     arrays: 'never',
    //     objects: 'always',
    //     imports: 'never',
    //     exports: 'never',
    //     functions: 'never',
    //   },
    // ],
  },
  overrides: [
    {
      files: ['**/__tests__/*.{j,t}s?(x)', '**/tests/unit/**/*.spec.{j,t}s?(x)'],
      env: {
        jest: true,
      },
    },
  ],
};
