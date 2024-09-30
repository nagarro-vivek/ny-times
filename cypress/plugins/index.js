const { startDevServer } = require('@cypress/webpack-dev-server');
const { addMatchImageSnapshotPlugin } = require('cypress-image-snapshot/plugin');
const { startDevServer } = require('@cypress/webpack-dev-server');
const { addMatchImageSnapshotPlugin } = require('cypress-image-snapshot/plugin');
const codeCoverageTask = require('@cypress/code-coverage/task');

module.exports = (on, config) => {
  on('dev-server:start', async (options) => {
    return startDevServer({ options });
  });

  addMatchImageSnapshotPlugin(on, config);
  on('task', codeCoverageTask);
};