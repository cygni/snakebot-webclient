const versionNumber = require('./package.json').version;
const argv = require('minimist')(process.argv.slice(2));
const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const getServerUrl = function () {
  /*const host = argv['server-host'] !== undefined ? argv['server-host'] : 'snake.cygni.se';
  if (argv['server-port'] !== undefined) {
    return 'http://' + host + ':' + argv['server-port'];
  }*/
  return 'http://localhost:8080';
};

const getEnvironment = function () {
  return process.env.NODE_ENV === 'production' ? 'production' : 'development';
};

const getVersionNumber = function () {
  const buildNumber = process.env.BUILD_NUMBER;
  if (buildNumber !== undefined) {
    return versionNumber + '+build' + buildNumber + ' ' + getEnvironment();
  }
  return versionNumber + '+local ' + getEnvironment();
};

const configuration = {
  server: getServerUrl(),
  version: getVersionNumber(),
  buildDate: new Date(),
  environment: getEnvironment(),
};

const prod = () => configuration.environment === 'production';

console.log('Building version: ' + configuration.version);
console.log('Using snake server host: ' + configuration.server);

module.exports = {
  mode: 'production',
  resolve: {
    extensions: ['', '.js', '.jsx'],
  },
  entry: './app/App.jsx',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
    publicPath: '/',
  },
  
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV' : JSON.stringify('production')
  }),
    
      new HtmlWebpackPlugin({
        template: 'dist/index.html'
      })
  ],
  module: {
    rules: [{
      test: /\.jsx?/,
      exclude: /node_modules/,
      loader: 'babel-loader',
      loader: 'svg-inline-loader',
      loader: 'file-loader'
    }],
    
  },
  externals: {
    Config: JSON.stringify(configuration),
  },
};
