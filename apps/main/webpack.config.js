const { composePlugins, withNx } = require('@nrwl/webpack');
const { withReact } = require('@nrwl/react');
const path = require('path');


// Nx plugins for webpack.
module.exports = composePlugins(withNx(), withReact(), (config, { options, context }) => {
  // Update the webpack config as needed here.
  // e.g. `config.plugins.push(new MyPlugin())`

  config.output.path = path.resolve(__dirname, "../../dist/apps/main")
  config.output.publicPath = path.resolve(__dirname, "../../dist/apps/main")
  return config;
});
