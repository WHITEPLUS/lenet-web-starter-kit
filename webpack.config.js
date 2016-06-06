require('babel-polyfill');
const path = require('path');
const webpack = require('webpack');
// const ExtractTextPlugin = require('extract-text-webpack-plugin');

var DEBUG = !process.argv.includes('--release');

var plugins = [
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.DefinePlugin({'process.env.NODE_ENV': '"' + (process.env.NODE_ENV || (DEBUG ? 'development' : 'production')) + '"'})
];

if (!DEBUG) {
    plugins.push(
        new webpack.optimize.DedupePlugin(),
        new webpack.optimize.UglifyJsPlugin({compress: {screw_ie8: true, warnings: true}}),
        new webpack.optimize.AggressiveMergingPlugin()
    );
}

module.exports = {
    cache: DEBUG,
    debug: DEBUG,
    stats: {
        colors: true,
        timings: true,
        hash: true,
        version: true,
        chunks: true,
        chunkModules: true,
        cached: true,
        cachedAssets: true,
        reasons: DEBUG
    },
    entry: [
        './src/es2015/main.jsx'
    ],
    output: {
        path: path.join(__dirname, 'assets'),
        filename: 'bundle.js',
        publicPath: '/assets/'
    },
    target: 'web',
    devtool: DEBUG ? 'cheap-module-eval-source-map' : false,
    plugins: plugins,
    module: {
        loaders: [
            {
                test: /\.js[x]?$/,
                include: [path.resolve(__dirname, 'src/es2015')],
                loaders: ['react-hot', 'babel']
            },
            {
                test: /\.scss$/,
                loaders: ['style', 'css', 'sass']
            },
            {
                test: /\.(jpg|png)$/,
                loaders: 'url-loader'
            }
        ]
    },
    resolve: {
        extensions: ['', '.js', '.jsx']
    }
};
