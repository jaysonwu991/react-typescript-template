module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
    es6: true,
  },
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 2022,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
      experimentalObjectRestSpread: true,
    },
  },
  extends: ['eslint:recommended', 'plugin:react/recommended', 'prettier/prettier'],
  plugins: ['@typescript-eslint', 'react-hooks', 'react', 'prettier'],
  settings: {
    react: {
      pragma: 'React',
      version: 'detect',
    },
  },
  rules: {
    'prettier/prettier': 0,
    semi: [2, 'always'],
    quotes: [2, 'single'],
    'consistent-return': 2,
    'jsx-quotes': [2, 'prefer-single'],
    'object-curly-spacing': [2, 'always'],
    'array-callback-return': 2,
    'array-bracket-spacing': [2, 'never'],
    'react/no-typos': 2,
    'react/jsx-no-bind': 2,
    'react/jsx-uses-react': 0,
    'react/no-unused-state': 2,
    'react/react-in-jsx-scope': 0,
    'react-hooks/rules-of-hooks': 2,
    'react-hooks/exhaustive-deps': 1,
    'comma-spacing': [2, { before: false, after: true }],
    'comma-dangle': [
      2,
      {
        arrays: 'always-multiline',
        exports: 'always-multiline',
        functions: 'never',
        imports: 'always-multiline',
        objects: 'always-multiline',
      },
    ],
    'no-unused-vars': [
      1,
      {
        args: 'after-used',
        argsIgnorePattern: '^_',
        varsIgnorePattern: '^_',
        ignoreRestSiblings: true,
      },
    ],
  },
};
