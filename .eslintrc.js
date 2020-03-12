module.exports = {
  env: {
    commonjs: true,
    es6: true,
		node: true,
		jest: true
	},
	plugins: ['jest', 'jsdoc', 'prettier'],
  extends: [
    'plugin:jest/recommended',
    'plugin:jsdoc/recommended',
    'airbnb-base',
    'plugin:prettier/recommended' // Enables eslint-plugin-prettier and displays prettier errors as ESLint errors.
  ],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parserOptions: {
    ecmaVersion: 2018,
  },
  rules: {
    'no-unused-vars': ['error', { 'argsIgnorePattern': '^_' }],
    'jsdoc/require-jsdoc': ['error', {'publicOnly': true}]
  },
};
