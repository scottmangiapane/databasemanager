var path = require('path');
var webpack = require('webpack');

module.exports = {
    entry: './app/app.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        publicPath: 'dist/',
        filename: 'build.js'
    },
    module: {
        loaders: [
            {
                test: /\.css$/,
                loader: 'css'
            },
            {
                test: /\.vue$/,
                loader: 'vue'
            },
            {
                test: /\.js$/,
                loader: 'babel',
                exclude: /node_modules/
            },
            {
                test: /\.(png|jpg|gif|svg)$/,
                loader: 'file',
                exclude: /node_modules/
            }
        ]
    },
    babel: {
        "presets": ["es2015"],
        "plugins": ["transform-runtime"]
    },
    plugins: [
        new webpack.ExternalsPlugin('commonjs', [
            'electron'
        ])
    ],
    externals: {
        "fs": "commonjs fs",
        "pg": "commonjs pg",
    },
    target: "node"
};