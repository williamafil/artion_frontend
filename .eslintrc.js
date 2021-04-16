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
