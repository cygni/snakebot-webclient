const versionNumber = require('./package.json').version;
const argv = require('minimist')(process.argv.slice(2));
const webpack = require('webpack');

const getServerUrl = function () {
  const host = argv['server-host'] !== undefined ? argv['server-host'] : 'snake.cygni.se';
  if (argv['server-port'] !== undefined) {
    return 'http://' + host + ':' + argv['server-port'];
  }
  return 'http://' + host;
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

console.log('Building version: ' + configuration.version);
console.log('Using snake server host: ' + configuration.server);

module.exports = {
  entry: './app/App.jsx',
  output: {
    path: './dist',
    filename: 'bundle.js',
    publicPath: '/',
  },
  devServer: {
    inline: true,
    contentBase: './dist',
  },

  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(configuration.environment),
      },
    }),
  ],
  module: {
    loaders: [{
      test: /\.jsx?$/,
      exclude: /node_modules/,
      loader: 'babel',
      query: {
        presets: ['react', 'es2015'],
      },
    }, {
      test: /\.scss$/,
      include: /app/,
      loaders: ['style', 'css', 'sass'],
    }, {
      test: /\.(jpe?g|gif|svg)$/i,
      loaders: [
        'url?limit=8192',
        'img',
      ],
    }, {
      test: /\.png$/,
      loader: 'url-loader',
      query: {
        mimetype: 'image/png',
      },
    }],
  },
  externals: {
    Config: JSON.stringify(configuration),
  },
};
