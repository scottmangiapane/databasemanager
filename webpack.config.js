const path = require('path');
const webpack = require('webpack');

module.exports = {
    entry: './app/render.js',
    output: {
        path: path.resolve(__dirname, 'build'),
        publicPath: 'build/',
        filename: 'build.js'
    },
    resolve: {
        alias: {
            vue: 'vue/dist/vue.js'
        }
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                loader: 'css-loader'
            },
            {
                test: /\.vue$/,
                loader: 'vue-loader'
            },
            {
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: /node_modules/
            },
            {
                test: /\.(png|jpg|gif|svg)$/,
                loader: 'file-loader',
                exclude: /node_modules/
            }
        ]
    },
    target: "electron"
};