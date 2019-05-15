module.exports = {
  parser: 'babel-eslint',
  extends: ['airbnb', 'prettier', 'prettier/react'],
  plugins: ['jsx-a11y', 'react', 'import'],
  env: {
    browser: true,
    es6: true,
  },
  parserOptions: {
    ecmaVersion: 6,
    sourceType: 'module',
    ecmaFeatures: {
      experimentalObjectRestSpread: true,
      jsx: true,
    },
  },
  rules: {
    semi: ['error', 'never'],
    'react/forbid-prop-types': 'off',
    'react/require-default-props': 'off',
    'react/prop-types': 'off',
    'import/no-extraneous-dependencies': 'off',
  },
}
