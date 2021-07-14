const path = require('path');

const { createConfig } = require('@edx/frontend-build');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const Dotenv = require('dotenv-webpack');
const { HotModuleReplacementPlugin } = require('webpack');

const orgName = "edx";

const config = createConfig('webpack-dev');
config.plugins = [
  new HtmlWebpackPlugin({
    inject: false,
    template: path.resolve(process.cwd(), 'src/index.ejs'),
    templateParameters: {
      orgName,
      FAVICON_URL: process.env.FAVICON_URL || null,
    },
  }),
  new Dotenv({
    path: path.resolve(process.cwd(), '.env.development'),
    systemvars: true,
  }),
  // when the --hot option is not passed in as part of the command
  // the HotModuleReplacementPlugin has to be specified in the Webpack configuration
  // https://webpack.js.org/configuration/dev-server/#devserver-hot
  new HotModuleReplacementPlugin(),
];

module.exports = config;
