const path = require('path');
const fs = require('fs');
const commonConfig = require('./webpack.common.js');
const merge = require('webpack-merge');
const webpack = require('webpack');
const AddAssetHtmlWebpackPlugin = require('add-asset-html-webpack-plugin');

const plugins =  [
  new webpack.HotModuleReplacementPlugin()
];

const files = fs.readdirSync(path.resolve(__dirname, '../dll'));
files.forEach(file => {
  if(/.*\.dll.js/.test(file)) {
    plugins.push(new AddAssetHtmlWebpackPlugin({
      filepath: path.resolve(__dirname, '../dll', file)
    }))
  }
  if(/.*\.manifest.json/.test(file)) {
    plugins.push(new webpack.DllReferencePlugin({
      manifest: path.resolve(__dirname, '../dll', file)
    }))
  }
});

const devConfig = {
    mode: 'development',
    devtool: 'cheap-module-eval-source-map',
    output: {
      path: path.resolve(__dirname, '../dist'),
      filename: '[name].[hash].js',
      chunkFilename: '[name].[hash].js',
    },
    devServer: {
        overlay: true,
        contentBase: './dist',
        historyApiFallback: true,
        hot: true,
        open: true,
        port: 3001,
        "/api": {
          target: "http://localhost:3000",
          pathRewrite: {"^/api" : ""}
        }
    },
    module: {
        rules: [
            {
                enforce: "pre", /* 强制eslint-loader 先执行 */
                test: /\.jsx?$/,
                exclude: /node_modules/,
                use: {
                    loader: 'eslint-loader',
                    options: {
                        cache: true,
                    }
                }
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader', 'postcss-loader'],
            },
            {
                test: /\.less$/,
                include: path.resolve(__dirname, '../src'),
                use: [
                    'style-loader', {
                        loader: 'css-loader',
                        options: {
                            modules: true, /* css in modules */
                            importLoaders: 2,
                            // localIdentName: '[name]-[local]-[hash:base64:5]',
                        }
                    },
                    'postcss-loader',
                    {
                        loader: 'less-loader',
                        options: {
                            javascriptEnabled: true, /* less-loader > 3.0 需要配置 */
                        }
                    },
                ],


            },
            {
                test: /\.less$/,
                exclude: path.resolve(__dirname, '../src'),
                use: [
                    'style-loader', {
                        loader: 'css-loader',
                        options: {
                            modules: false,
                            importLoaders: 2,
                        }
                    },{
                        loader: 'less-loader',
                        options: {
                            javascriptEnabled: true,
                        }
                    },
                ],
            },
        ]
    },
    plugins,
}
module.exports = merge(commonConfig, devConfig);
