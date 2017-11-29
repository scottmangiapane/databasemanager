const path = require('path');
const webpack = require('webpack');

module.exports = {
    entry: './src/render.js',
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
            }
        ]
    },
    target: "electron"
};