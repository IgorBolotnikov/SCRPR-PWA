module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'plugin:react/recommended',
    'airbnb',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: 'module',
  },
  plugins: [
    'react',
    '@typescript-eslint',
  ],
  settings: {
    'import/resolver': {
      node: {
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
        paths: ['.'],
      },
    },
  },
  rules: {
    // Allow .js files to use JSX syntax until project is migrated to TypeScript
    'react/jsx-filename-extension': [1, { extensions: ['.js', '.jsx', 'tsx'] }],

    // Max line length
    'max-len': [
      'error',
      {
        code: 140,
        ignorePattern: '^import\\s.+\\sfrom\\s.+;$',
      },
    ],

    // Import order
    'import/order': [
      'warn',
      {
        groups: ['builtin', 'external', 'internal', 'parent', 'sibling', 'index'],
        'newlines-between': 'always',
      },
    ],

    // note you must disable the base rule as it can report incorrect errors
    'no-use-before-define': 'off',
    '@typescript-eslint/no-use-before-define': ['off'],

    // Fix requirement to add extensions to import files
    'import/extensions': [
      'error',
      'ignorePackages',
      {
        js: 'never',
        jsx: 'never',
        ts: 'never',
        tsx: 'never',
      },
    ],

    // Allow absolute paths
    'import/no-absolute-path': [2, { commonjs: false, amd: false, esmodule: false }],

    // Allow pasting raw HTML
    'react/no-danger': 0,

    // Allow usage of snake_case for API response data
    camelcase: 'off',

    // Don't use propTypes
    'react/prop-types': 0,
    'react/require-default-props': 0,

    // Remove all false-positives
    'no-unused-vars': 'off',
    '@typescript-eslint/no-unused-vars': 'error',

    // Disallow any type except in ...rest
    '@typescript-eslint/no-explicit-any': ['error', { ignoreRestArgs: true }],

    // Allow to connect label by EITHER using id or nesting
    'jsx-a11y/label-has-associated-control': ['error', {
      required: {
        some: ['nesting', 'id'],
      },
    }],
    'jsx-a11y/label-has-for': ['error', {
      required: {
        some: ['nesting', 'id'],
      },
    }],
  },
};
