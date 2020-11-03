// e.g. https://github.com/Talkdesk/td-ui-engine/blob/master/jest.config.js
module.exports = {
  collectCoverageFrom: ['**/**/*.{js,jsx,ts,tsx}', '!**/*.d.ts'],
  testMatch: ['<rootDir>/test/**/?(*.)(spec|test).(j|t)s?(x)'],
  testEnvironment: 'jsdom',
  verbose: true,
  collectCoverage: true,
  coverageReporters: ['text'],
};
