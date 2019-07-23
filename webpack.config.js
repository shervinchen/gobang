const path = require('path')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')

module.exports = {
  mode: 'development',
  entry: './src/main.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'gobang.min.js'
    // libraryTarget: 'umd',
    // library: 'gobang'
  },
  plugins: [
    new CleanWebpackPlugin(),
    new UglifyJsPlugin({
      test: /\.js($|\?)/i
    })
  ],
  devtool: 'inline-source-map',
  devServer: {
    // 每次构建时候自动打开浏览器并访问网址
    // open: true,
    // 开启热更新
    // hot: true,
    contentBase: './'
    // port: "8080",
    // host: "localhost",
    // inline: true,
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        // include: path.resolve(__dirname , 'src'),
        exclude: /node_modules/,
        use: ['babel-loader']
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      }
    ]
  }
  // 只有在开启监听模式时，watchOptions 才有意义
  // 默认为 false，也就是不开启
  //   watch: true,
  //   // 监听模式运行时的参数
  //   // 在开启监听模式时，才有意义
  //   watchOptions: {
  //     // 不监听的文件或文件夹，支持正则匹配
  //     // 默认为空
  //     ignored: /node_modules/,
  //     // 监听到变化发生后会等300ms再去执行动作，防止文件更新太快导致重新编译频率太高
  //     // 默认为 300ms
  //     aggregateTimeout: 300,
  //     // 判断文件是否发生变化是通过不停的去询问系统指定文件有没有变化实现的
  //     // 默认每秒问 1000 次
  //     poll: 1000,
  //   },
}
