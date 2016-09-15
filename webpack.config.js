var argv = require('minimist')(process.argv.slice(2));
var getServerUrl = function () {
    var host = argv['server-host'] != undefined ? argv['server-host'] : "snake.cygni.se";
    if (argv['server-port'] != undefined) {
        return "http://" + host + ":" + argv['server-port']
    }
    return "http://" + host;
}

var getVersionNumber = function () {
    var versionNumber = require('./package.json').version;
    var buildNumber = process.env.BUILD_NUMBER;
    if(buildNumber != undefined) {
        return versionNumber + "+build" + buildNumber;
    } else {
        return versionNumber + "+local";
    }
}

var configuration = {
    server: getServerUrl(),
    version: getVersionNumber(),
    buildDate: new Date(),
}

console.log("Building version: " + configuration.version);
console.log("Using snake server host: " + configuration.server);

module.exports = {
    entry: "./app/App.js",
    output: {
        path: './dist',
        filename: "bundle.js",
        publicPath: '/'
    },
    devServer: {
        inline: true,
        contentBase: './dist'
    },
    module: {
        loaders: [
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                loader: 'babel',
                query: {
                    presets: ['react', 'es2015']
                }
            },
            {
                test: /\.scss$/,
                include: /app/,
                loaders: ['style', 'css', 'sass']
            },
            {
                test: /\.(jpe?g|png|gif|svg)$/i,
                loaders: [
                    'url?limit=8192',
                    'img'
                ]
            }
        ]
    },
    externals: {
        'Config': JSON.stringify(configuration)
    }
};

