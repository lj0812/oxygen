const path = require('path')
const webpack = require('webpack')
const webpackConfig = require('./webpack.config')

function resolve (dir) {
  return path.join(__dirname, '..')
}

const compiler = webpack(webpackConfig)

const watching = compiler.watch({
  // watchOptions 示例
  aggregateTimeout: 300,
  poll: undefined
}, (err, stats) => {
  // 在这里打印 watch/build 结果...
  console.log(stats);
});
