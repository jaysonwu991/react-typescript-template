module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
    es6: true
  },
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
      experimentalObjectRestSpread: true
    }
  },
  extends: ['eslint:recommended', 'plugin:react/recommended', 'prettier/prettier'],
  plugins: ['@typescript-eslint', 'babel', 'react', 'import', 'prettier', 'react-hooks'],
  settings: {
    react: {
      pragma: 'React',
      version: 'detect',
    },
  },
  rules: {
    'prettier/prettier': 2,
    semi: [2, 'never'],
    quotes: [2, 'single'],
    'jsx-quotes': [2, 'prefer-single'],
    'object-curly-spacing': [2, 'always'],
    'array-bracket-spacing': [2, 'never'],
    'import/no-duplicates': 2,
    'import/named': 2,
    'react/no-typos': 2,
    'react/no-unused-state': 2,
    'react/jsx-no-bind': 2,
    'react-hooks/rules-of-hooks': 2,
    'react-hooks/exhaustive-deps': 1,
    'react/jsx-uses-react': 0,
    'react/react-in-jsx-scope': 0,
    'array-callback-return': 2,
    'consistent-return': 2,
    'babel/no-invalid-this': 2,
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
}
