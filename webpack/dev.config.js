"use strict";

import path from "path";
import webpack from "webpack";
import config from "../config/dev";

var assetsPath = path.resolve(__dirname, '../app/public/dist');

module.exports = {
    context: path.resolve(__dirname, '..'),
    entry: {
        //Application specific code.
        app: [
            `webpack-dev-server/client?http://${config.HOST}:${config.PORT}`, 
            'webpack/hot/only-dev-server',
            './app/main.js'
        ],
        //All 3rd party source
        vendor: ['react', 'redux', 'lodash']
    },
    output: {
        path: assetsPath,
        publicPath: `http://${config.HOST}:${config.PORT}/public/dist/`,
        chunkFilename: "[name].js",
        filename: '[name].js',
    },
    module: {
        loaders: [
            {
                test: /\.js$/,
                loaders: ['react-hot', 'babel'],
                exclude: /node_modules/
            },
            {
                test: /\.scss$/,
                loader: 'style!css!sass?sourceMap'
            },
            {
                test: /\.(png|jpg|jpeg|ttf)$/,
                loader: 'url?limit=3000'
            }
        ]
    },
    progress: true,
    plugins: [
        // hot reload
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoErrorsPlugin(),
        new webpack.optimize.CommonsChunkPlugin(/* chunkName= */"vendor", /* filename= */"common.js"),
        new webpack.DefinePlugin({
            _DEVELOPMENT_: true,
            NODE_ENV: JSON.stringify("development")
        }),

        new webpack.optimize.DedupePlugin(),
        new webpack.optimize.OccurenceOrderPlugin()

    ],
    resolve: {
      extensions: ['', '.js', '.jsx', '.json', '.css', '.scss'],
      modulesDirectories: ['node_modules', 'src', 'styles']
    }
};
