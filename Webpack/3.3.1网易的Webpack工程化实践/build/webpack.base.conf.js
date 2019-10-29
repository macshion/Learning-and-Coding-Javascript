'use strict';
const HappyPack = require('happypack');
const path = require('path');
const utils = require('./utils');
const config = require('../config');
const vueLoaderConfig = require('./vue-loader.conf');
const webpack = require('webpack');
const os = require('os');
const happyThreadPool = HappyPack.ThreadPool({size: os.cpus().length});

function resolve(dir) {
    return path.join(__dirname, '..', dir);
}

module.exports = {
    context: path.resolve(__dirname, '../'),
    entry: utils.entries(),
    output: {
        path: config.build.assetsRoot,
        filename: '[name].js',
        publicPath: process.env.NODE_ENV === 'production'
            ? config.build.assetsPublicPath
            : config.dev.assetsPublicPath
    },
    externals: {
        /*兼容组件池富文本编辑器依赖*/
        shCore: {
            root: 'shCore'
        },
        /*兼容组件池富文本编辑器依赖*/
        XRegExp: {
            root: 'XRegExp'
        }
    },
    resolve: {
        extensions: ['.js', '.vue', '.json'],
        alias: {
            'vue$': 'vue/dist/vue.esm.js',
            '@': resolve('src'),
            'pool': resolve('lib'),
            'base': resolve('lib/nej/src/base'),
            'Regular': resolve('lib/regularjs/dist/regular.js'),
            'lib': resolve('lib/nej/src'),
            'ui': resolve('lib/nej/src/ui'),
            'util': resolve('lib/nej/src/util')
        }
    },
    plugins: [
        new webpack.ProvidePlugin({
            Regular: 'Regular'
        }),
        ...utils.htmlPlugin(),
        new HappyPack({
            id: 'happybabel',
            loaders: ['babel-loader?cacheDirectory=true'],
            threadPool: happyThreadPool,
        }),
        // new HappyPack({
        //     id: 'happyvue',
        //     loaders: [{
        //         loader: 'vue-loader',
        //         options: vueLoaderConfig˙
        //     }],
        //     threadPool: happyThreadPool,
        // }),
    ],
    module: {
        rules: [
            {
                test: /\.vue$/,
                loader: 'vue-loader',
                options: vueLoaderConfig
            },
            {
                test: /\.js$/,
                include: [resolve('src'), resolve('lib'), resolve('test'), resolve('node_modules/webpack-dev-server/client')],
                loader: 'happypack/loader?id=happybabel',
                exclude: /node_modules/
            },
            {
                test: /\.(html|htm)$/,
                loader: 'html-loader',
                options: {
                    attrs: ['data-src']
                }
            },
            {
                test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                    limit: 10000,
                    name: utils.assetsPath('img/[name].[hash:7].[ext]')
                }
            },
            {
                test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                    limit: 10000,
                    name: utils.assetsPath('media/[name].[hash:7].[ext]')
                }
            },
            {
                test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                    limit: 10000,
                    name: utils.assetsPath('fonts/[name].[hash:7].[ext]')
                }
            }
        ]
    },
    node: {
        // prevent webpack from injecting useless setImmediate polyfill because Vue
        // source contains it (although only uses it if it's native).
        setImmediate: false,
        // prevent webpack from injecting mocks to Node native modules
        // that does not make sense for the client
        dgram: 'empty',
        fs: 'empty',
        net: 'empty',
        tls: 'empty',
        child_process: 'empty'
    }
};
