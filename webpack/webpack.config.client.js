const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require("html-webpack-plugin");
const merge = require('webpack-merge');
const baseConfig = require('./webpack.config.base.js');
const utils = require('./utils');
const cleanWebpackPlugin = require("clean-webpack-plugin");
const VueSSRClientPlugin = require('vue-server-renderer/client-plugin')
const isProd = process.env.NODE_ENV === 'production';

module.exports = merge(baseConfig, {
    entry: {
        vendor: ['swiper'],
        index: ['babel-polyfill',utils.assetPath('entry/entry-client.js')]
    },
    output: {
        path: utils.assetPath('dist'),
        filename: 'js/[name].[hash:8].js',
        publicPath:'/',
        chunkFilename: 'js/[name].[chunkhash:8].chunk.js'
    },
    module: {
        rules: [{
            test: /\.(css|less)/,
            use: [
                {
                    loader: MiniCssExtractPlugin.loader
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
        ]
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: 'css/[name].[hash:8].css',
            chunkFilename: 'css/[name].chunk.[chunkhash:8].css'
        }),
        new VueSSRClientPlugin()
    ].concat(!isProd?[]:[
        new cleanWebpackPlugin(["dist"], {
            root: utils.assetPath()
        })
    ]),
    optimization: {
        splitChunks: {
            cacheGroups: {
                vendor: {
                    test: /node_modules/,
                    chunks: 'initial',
                    name: 'vendor',
                    enforce: true
                }
            }
        },
    }
})
