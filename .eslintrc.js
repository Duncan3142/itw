module.exports = {
  env: {
    commonjs: true,
    es6: true,
		node: true,
		jest: true
	},
	plugins: ["jest"],
  extends: [
		'plugin:jest/recommended',
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
  },
};
