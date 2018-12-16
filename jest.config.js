const { defaults } = require('jest-config')

const testPathIgnorePatterns = [...defaults.testPathIgnorePatterns, 'config']

module.exports = {
    testPathIgnorePatterns,
    moduleDirectories: ['node_modules', 'app'],
}
