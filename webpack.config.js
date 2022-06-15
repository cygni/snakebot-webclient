const versionNumber = require('./package.json').version;
const argv = require('minimist')(process.argv.slice(2));
const webpack = require('webpack');

const getServerUrl = function () {
  const host = argv['server-host'] !== undefined ? argv['server-host'] : 'localhost:8080';
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

const prod = () => configuration.environment === 'production';

console.log('Building version: ' + configuration.version);
console.log('Using snake server host: ' + configuration.server);

module.exports = {
  resolve: {
    extensions: ['', '.js', '.jsx'],
  },
  entry: './app/App.jsx',
  output: {
    path: __dirname + '/dist',
    filename: 'bundle.js',
    publicPath: '/',
  },
  devServer: {
    // inline: true,
    static: './dist',
    // https: true,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, PATCH, OPTIONS",
      "Access-Control-Allow-Headers": "X-Requested-With, content-type, Authorization"
    }
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(configuration.environment),
      },
    }),
  ],
  module: {
    // preLoaders: [{
    //   test: /\.(js|jsx)$/,
    //   loader: 'eslint-loader',
    //   cache: true,
    // }],
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: [
        {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-react', '@babel/preset-env'],
            plugins: prod() ? ['transform-remove-console'] : [],
          },
        },
      ],
      // query: {
      
    }, {
      test: /\.scss$/,
      include: /app/,
      // loaders: ['style', 'css', 'sass'],
      use: [
        {
          loader: "style-loader"
        },
        {
          loader: "css-loader"
        },
        {
          loader: "sass-loader"
        }
      ]
    }, {
      test: /\.(jpe?g|gif|svg|png")$/i,
      // loaders: [
        use: [
          {
            // loader: 'url?limit=8192',
            loader: "url-loader",
            options: {
              limit: 8192
            }
          },
          {
            loader: 'image-webpack-loader',
          }
      ],
    }, {
      test: /\.png$/,
      loader: 'url-loader',
      // query: {
      options: {
        mimetype: 'image/png',
      },
    }
  ],
  },
  externals: {
    Config: JSON.stringify(configuration),
  },
  mode: 'development'
};
