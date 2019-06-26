const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const path = require('path');
const merge = require('webpack-merge');
const commonConfig = require('./webpack.common.js');
const webpack = require('webpack');
const AddAssetHtmlWebpackPlugin = require('add-asset-html-webpack-plugin');

const prodConfig = {
    mode: 'production',
    devtool: 'cheap-module-source-map',
    output: {
        filename: 'static/js/[name]-[chunkhash].js',
        path: path.resolve(__dirname, '../dist'),
        // publicPath: 'https://proreserp.miaotaiche.com/'// 生产环境CDN域名
        publicPath: '/'
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader'],
            },
            {
                test: /\.less$/,
                include: path.resolve(__dirname, '../src'),
                use: [
                    MiniCssExtractPlugin.loader, {
                        loader: 'css-loader',
                        options: {
                            modules: true, /* css in modules */
                        }
                    }, {
                        loader: 'less-loader',
                        options: {
                            javascriptEnabled: true, /* less-loader > 3.0 需要配置 */
                        }
                    },
                    'postcss-loader'
                ],


            },
            {
                test: /\.less$/,
                exclude: path.resolve(__dirname, '../src'),
                use: [
                    MiniCssExtractPlugin.loader, {
                        loader: 'css-loader',
                        options: {
                            modules: false,
                        }
                    }, {
                        loader: 'less-loader',
                        options: {
                            javascriptEnabled: true,
                        }
                    },
                ],
            },
        ]
    },
    optimization: {
        /* 压缩打包的CSS文件 */
        minimizer: [
          new OptimizeCSSAssetsPlugin({}),
          /**/
          new UglifyJsPlugin({
              cache: true,
              parallel: true, /* 是否开启多进程 */
              sourceMap: true,
              uglifyOptions: {
                  warnings: false, // 在UglifyJs删除没有用到的代码时不输出警告
                  output: {
                      beautify: false, //不需要格式化
                      comments: false //不保留注释
                  },
                  compress: {
                      drop_console: true, // 删除所有的 `console` 语句，可以兼容ie浏览器
                      collapse_vars: true, // 内嵌定义了但是只用到一次的变量
                      reduce_vars: true // 提取出出现多次但是没有定义成变量去引用的静态值
                  }
              }
          }),
        ],
        runtimeChunk: {
            name: 'runtime'
        },
        usedExports: true,
        splitChunks: {
            chunks: 'all',
            maxInitialRequests: 5,
            cacheGroups: {
                vendors: {
                    test: /[\\/]node_modules[\\/]/,
                    priority: -10,
                    name: 'vendors',
                },
                icon: {
                  test: /[\\/]node_modules[\\/]@ant-design/,
                  priority: -5,
                  name: 'icon',
                },
                antd: {
                  test: /[\\/]node_modules[\\/]antd/,
                  priority: -1,
                  name: 'antd',
                }
            }
        }
    },
    plugins: [
        /* 从js分离css */
        new MiniCssExtractPlugin({
            filename: 'static/css/[name]-[hash].css',
            chunkFilename: 'static/css/[name]-[hash].css'
        }),
        new webpack.DllReferencePlugin({
          manifest: path.resolve(__dirname, '../dll', 'react.manifest.json')
        }),
        new AddAssetHtmlWebpackPlugin({
          filepath: path.resolve(__dirname, '../dll', 'react.dll.js')
        }),
    ]
}
module.exports = merge(commonConfig, prodConfig);
