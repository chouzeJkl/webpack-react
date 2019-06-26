const path = require('path');
const htmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
// const CopyWebpackPlugin = require('copy-webpack-plugin');

const plugins = [
  /* 生成html文本模板 */
  new htmlWebpackPlugin({
  template: 'index.html',
}),
  /* 打包时先删除当前的文件 */
  new CleanWebpackPlugin(),
  /* 复制静态资源到打包的目录下 */
  // new CopyWebpackPlugin([
  //   {
  //     from: path.resolve(__dirname, '../static'),
  //     to: path.resolve(__dirname, '../dist/static'),
  //     ignore: ['.*']
  //   }
  // ])
];
const commonConfig = {
    entry: {
        app: './src/index.js'
    },
    resolve: {
      modules: ['src', 'node_modules'],
      extensions: ['.js', '.jsx', '.less'],
      /* 设置别名 */
      alias: {
        'src': path.resolve(__dirname, '../src/'),
        '@pages': path.resolve(__dirname, '../src/pages/'),
        'themes': path.resolve(__dirname, '../src/themes/'),
      },
    },
    module: {
        rules: [
          {
            test: /\.tsx?$/,
            include: path.resolve(__dirname, '../src'),
            use: ['babel-loader', 'ts-loader']
          },
          {
              test: /\.jsx?$/,
              include: path.resolve(__dirname, '../src'),
              use: 'babel-loader'
            },
          {
              test: /\.(jpe?g|png|gif|svg)$/,
              use: {
                  loader: 'url-loader',
                  options: {
                      limit: 10240, /* 大于10000字节就 输出图片 否则处理为 data url */
                      name: 'static/images/[name]-[hash].[ext]'
                  }
              }
          },
          {
              test: /\.(eot|ttf)$/,
              use: ['file-loader']
          }
      ]
    },
    performance: false, /* 不设置性能提示 */
    plugins,
  
}
module.exports = commonConfig;
