module.exports = {
  root: true,
  extends: ['@react-native/eslint-config', 'prettier'],
  parserOptions: {
    ecmaVersion: 2022,
    sourceType: 'module',
  },
  env: {
    'react-native/react-native': true,
    jest: true,
  },
  rules: {
    // Example tweaks; adjust as you prefer
    'no-console': ['warn', { allow: ['warn', 'error'] }],
    'react/react-in-jsx-scope': 'off',
  },
};
