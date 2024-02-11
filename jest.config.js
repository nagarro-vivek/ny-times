module.exports = {
  // other Jest configuration options...
  testPathIgnorePatterns: [
    "/node_modules/", // Ignore node_modules
    "/dist/", // Ignore build output directory
    "/coverage/", // Ignore coverage reports
    "/example/", // Ignore example files
    "/stories/", // Ignore storybook stories
    "/__mocks__/", // Ignore mock files
  ],
};
