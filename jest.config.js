/** @type {import('ts-jest').JestConfigWithTsJest} */
const { defaults: tsjPreset } = require('ts-jest/presets');

module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  transform: {
    ...tsjPreset.transform
  }
};