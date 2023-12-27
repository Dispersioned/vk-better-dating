module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'airbnb',
    'airbnb-typescript',
    'plugin:react/recommended',
    // Resolve for eslint rules
    'plugin:@typescript-eslint/recommended',
    // React 17^ uses new jsx transformer
    // we disable recommended eslint rule by
    // extending this plugin
    'plugin:react/jsx-runtime',
    'plugin:prettier/recommended',
    // Equal to
    // {
    //   "extends": ["prettier"],
    //   "plugins": ["prettier"],
    //   "rules": {
    //     "prettier/prettier": "error",
    //     "arrow-body-style": "off",
    //     "prefer-arrow-callback": "off"
    //   }
    // }
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  parser: '@typescript-eslint/parser',
  plugins: ['react', '@typescript-eslint'],

  rules: {
    //? Probe for needed configs during development
    //? General
    // camelcase: 'error',
    // 'spaced-comment': 'error',
    // quotes: ['error', 'single'],
    // 'object-curly-newline': 'off',
    // 'prefer-template': 'off',
    // 'no-restricted-syntax': 'off',
    // 'no-duplicate-imports': 'error',
    // 'import/no-unresolved': 'error',
    'no-continue': 'warn',
    'no-plusplus': 'off',
    'no-unused-vars': 'warn',
    'react/jsx-props-no-spreading': 'warn',

    //? Breaks custom wrappers for UIKits (<CustomBtn ...props />)
    // 'prefer-destructuring': 'warn',
    'max-len': [
      'error',
      {
        ignoreComments: true,
        code: 120,
      },
    ],
    //? Disable errors in React components
    // 'no-use-before-define': 'off',
    // '@typescript-eslint/no-use-before-define': ['error'],
    //? use ts instead prop-types
    'react/require-default-props': 'off',
    'react/no-unused-prop-types': 'warn',

    //? Consistent rename-friendly exports
    'import/prefer-default-export': 'off',
    'import/no-default-export': 'error',
    //? Breaks some features on Next.js & MUI
    //? Sometimes works bad with prettier printWidth
    // 'implicit-arrow-linebreak': 'off',
    // 'react/jsx-filename-extension': [2, { extensions: ['.js', '.jsx', '.ts', '.tsx'] }],
    //? seems like this is needed only on original CRA for overrideing
    // 'import/extensions': [
    // 'error',
    // 'ignorePackages',
    // {
    // js: 'never',
    // jsx: 'never',
    // ts: 'never',
    // tsx: 'never',
    // },
    // ],
  },
  // USE FOR REDUX TOOLKIT OR OTHER IMMER LIBRARIES
  //   overrides: [
  //   {
  //     // feel free to replace with your preferred file pattern - eg. 'src/**/*Slice.ts'
  //     files: ['src/**/*Slice.ts'],
  //     rules: { 'no-param-reassign': ['error', { props: false }] },
  //   },
  // ],
};
