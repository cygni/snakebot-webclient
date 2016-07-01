var argv = require('minimist')(process.argv.slice(2));
var getServerUrl = function () {
    var host = argv['server-host'] != undefined ? argv['server-host'] : "snake.cygni.se";
    if (argv['server-port'] != undefined) {
        return "http://" + host + ":" + argv['server-port']
    }
    return "http://" + host;
}

var configuration = {
    server: getServerUrl()
}

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
                loaders: ['style', 'css', 'sass']
            }
        ]
    },
    externals: {
        'Config': JSON.stringify(configuration)
    }
};

