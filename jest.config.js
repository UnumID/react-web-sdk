const expoPreset = require('jest-expo/jest-preset');
const jestPreset = require('@testing-library/react-native/jest-preset');

module.exports = Object.assign(expoPreset, jestPreset, {
  present: 'ts-jest',
  setupFiles: [...expoPreset.setupFiles, ...jestPreset.setupFiles, './setupTests.js', 'jest-useragent-mock'],
});
