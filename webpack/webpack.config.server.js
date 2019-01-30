const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require("html-webpack-plugin");
const merge = require('webpack-merge');
const baseConfig = require('./webpack.config.base.js');
const utils = require('./utils');
const VueSSRServerPlugin = require('vue-server-renderer/server-plugin')
const isProd = process.env.NODE_ENV === 'production';
module.exports = merge(baseConfig, {
    target: 'node',
    entry: {
        server:utils.assetPath('entry/entry-server.js')
    },
    output: {
        path: utils.assetPath('dist'),
        filename: 'js/[name].js',
        libraryTarget:'commonjs2'
    },
    module: {
        rules: [
            {
            test: /\.(css|less)/,
            use: [
                {
                    loader: 'vue-style-loader'
                },
                {
                    loader: 'css-loader',
                    options: {
                        importLoaders: 1,
                        sourceMap: !isProd
                    }
                },
                {
                    loader: 'less-loader',
                    options: {
                        sourceMap: !isProd
                    }
                },
                'postcss-loader'
            ]
        }
    ] },
    plugins: [
        new VueSSRServerPlugin()
    ]
})
