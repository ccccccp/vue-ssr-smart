const webpack = require("webpack");
const VueLoaderPlugin = require("vue-loader/lib/plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const utils = require("./utils");
const TerserPlugin = require('terser-webpack-plugin');
const ProgressBar = require("progress-bar-webpack-plugin");
const isProd = process.env.NODE_ENV === 'production';
module.exports = {
    mode: isProd ? 'production' : 'development',
    devtool: isProd ? false : 'cheap-module-eval-source-map',
    module: {
        rules: [Object.assign({
            test: /\.js$/,
            use: [{
                loader: 'babel-loader?cacheDirectory'
            }]
        }, utils.loaderFileConfig),
        Object.assign({
            test: /\.vue$/,
            use: [{
                loader: 'vue-loader?cacheDirectory'
            }]
        }, utils.loaderFileConfig),
        {
            test: /\.(png|jpe?g|gif|svg)/,
            use: [{
                loader: 'file-loader',
                options: {
                    name: '[name].[hash:7].[ext]',
                    outputPath: 'assets/images'
                }
            }]
        }, {
            test: /\.(woff|woff2|eot|ttf|otf)$/,
            use: [{
                loader: 'file-loader',
                options: {
                    name: '[name].[hash:7].[ext]',
                    outputPath: 'assets/fonts'
                }
            }]
        }
        ]
    },
    optimization: {
        minimizer: [].concat(!isProd ? [] : [
            new TerserPlugin({
                parallel: true,
                cache: true,
                terserOptions: {
                    ecma: undefined,
                    warnings: false,
                    parse: {},
                    compress: {
                        drop_debugger: true, // 删除 debugger
                        drop_console: true, // 删除 console
                    },
                    mangle: true,
                    module: false,
                    output: null,
                    toplevel: false,
                    nameCache: null,
                    ie8: true,
                    keep_classnames: undefined,
                    keep_fnames: false,
                    safari10: true,
                },
            })
        ])
    },
    plugins: [
        new VueLoaderPlugin(),
        new ProgressBar()
    ],
    resolve: {
        alias: {
            '@': utils.assetPath('src'),
            vue: 'vue/dist/vue.js'
        }
    }
}