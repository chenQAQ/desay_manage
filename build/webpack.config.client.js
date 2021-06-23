const path = require('path')
const {
    VueLoaderPlugin
} = require('vue-loader')
const isDev = process.env.NODE_ENV === 'development'
const webpack = require('webpack')
const HTMLPlugin = require('html-webpack-plugin')
const ExtractPlugin = require('extract-text-webpack-plugin')
const baseConfig = require('./webpack.config.base.js')
const merge = require('webpack-merge')
const devServer = {
    port: 4009,
    host: 'localhost',
    overlay: {
        errors: true
    },
    open: true,
    hot: true,
    proxy: {
        // proxy all requests starting with /api to jsonplaceholder
        '/manage/': {
            target: 'http://game.sgjyun.com/manage/',
            changeOrigin: true,
            pathRewrite: {
                '^/manage/': ''
            }
        }
    }
}
const defaultPlugins = [
    new webpack.DefinePlugin({
        'process.env': {
            NODE_ENV: isDev ? '"development"' : '"production"'
        }
    }),
    new VueLoaderPlugin(),
    new HTMLPlugin({
        filename: 'index.html',
        template: 'index.html',
        inject: true
    })
]
let config
if (isDev) {
    config = merge(baseConfig, {
        devtool: '#cheap-module-eval-source-map',
        module: {
            rules: [{
                test: /\.css$/,
                use: [
                    'vue-style-loader',
                    'css-loader',
                    {
                        loader: 'postcss-loader',
                        options: {
                            sourceMap: true,
                        }
                    }
                ]
            }]
        },
        devServer,
        plugins: defaultPlugins.concat([
            new webpack.HotModuleReplacementPlugin()
        ])
    })
} else {
    config = merge(baseConfig, {
        output: {
            filename: '[name].[chunkhash:8].js'
        },
        module: {
            rules: [{
                test: /\.css$/,
                use: ExtractPlugin.extract({
                    fallback: 'vue-style-loader',
                    use: [
                        'css-loader',
                        {
                            loader: 'postcss-loader',
                            options: {
                                sourceMap: true,
                            }
                        }
                    ]
                })
            }]
        },
        plugins: defaultPlugins.concat([
            new ExtractPlugin('styles.[chunkhash:8].css')
        ])
    })
}
module.exports = config