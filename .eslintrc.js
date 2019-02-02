module.exports = {
  extends: ['airbnb-base', 'prettier'],
  plugins: ['import', 'jest'],
  env: {
    node: true,
    'jest/globals': true,
  },
  rules: {
    semi: ['error', 'never'],
    'import/no-extraneous-dependencies': 'off',
  },
}
