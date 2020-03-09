module.exports = {
  env: {
    commonjs: true,
    es6: true,
		node: true,
		jest: true
	},
	plugins: ['jest', 'jsdoc'],
  extends: [
    'plugin:jest/recommended',
    'plugin:jsdoc/recommended',
    'airbnb-base',
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
