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
const writeJson = require('write-json')
const QiniuPlugin = require('qiniu-webpack-plugin')
    // 这里配置 Plugin
let cdn_ver = require('./cdn.json').version

let addVer = (ver) => {
    let ar = ver.split('.')
    ar[2] = parseInt(ar[2]) + 1
    return ar.join('.')
}

let verNow = addVer(cdn_ver)
const qiniuPlugin = new QiniuPlugin({
    ACCESS_KEY: 'E5sYahBxp7RfMECLXhCUZJD3U_BTKYGsPDS4NLFd',
    SECRET_KEY: 'mlO3FEmRX-S_9XPCf9WrkvzgnpZ8IlmHeiVrIDQF',
    bucket: 'vue',
    path: `answermanage/${verNow}/`
});
const devServer = {
    port: 4000,
    host: 'localhost',
    overlay: {
        errors: true
    },
    open: true,
    hot: true,
    proxy: {
        // proxy all requests starting with /api to jsonplaceholder
        '/log/': {
            target: 'https://dt.sgjyun.com:9501/log/',
            changeOrigin: true,
            pathRewrite: {
                '^/log/': ''
            }
        },
        '/manage/': {
            target: 'https://dt.sgjyun.com/manage/',
            changeOrigin: true,
            pathRewrite: {
                '^/manage/': ''
            }
        },

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
            filename: '[name].[chunkhash:8].js',
            publicPath: `//kuyi.shengws.com/answermanage/${verNow}/`
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
            new ExtractPlugin('styles.[chunkhash:8].css'),
            qiniuPlugin
        ])
    })
}
writeJson.promise(path.join(__dirname, './cdn.json'), {
    version: verNow
}).then(function() {
    // do stuff
    console.log('write cdn.json ok')
})
module.exports = config