module.exports = {
  coverageThreshold: {
    global: {
      statements: 98,
      branches: 91,
      functions: 98,
      lines: 98
    }
  },
  transform: {
    '.(ts|tsx)': '<rootDir>/test/preprocessor.js'
  },
  testRegex: '(/__tests__/.*|\\.(test|spec))\\.(ts|tsx|js)$',
  moduleFileExtensions: ['ts', 'js', 'json'],
  testEnvironment: 'node',
  setupFilesAfterEnv: ['./test/unit/lib/setup.ts']
}
