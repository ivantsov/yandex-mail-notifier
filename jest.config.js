module.exports = {
  rootDir: './src',
  clearMocks: true,
  resetModules: true,
  moduleDirectories: [
    'node_modules',
    'src/pages',
  ],
  moduleNameMapper: {
    '\\.(less)$': 'identity-obj-proxy',
  },
  testPathIgnorePatterns: [
    '/node_modules/',
    'fixtures.js',
  ],
};
