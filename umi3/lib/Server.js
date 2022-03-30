let express = require('express');
let http = require('http');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackDevMiddleware = require('webpack-dev-middleware');
const webpackConfig = require('./webpack.config');
const { absTmpPath, absSRCPath } = require('../plugins/generateFiles/getPaths');
const webpack = require('webpack');
const { join } = require('path');

// 需要些一个webpack中间件， 打包并预览我们的项目
class Server {
  constructor() {
    this.app = new express();
  }
  setWebpackConfig() {
    webpackConfig.entry = join(absTmpPath, 'umi.js');
    webpackConfig.resolve.alias['@'] = absSRCPath;
    webpackConfig.plugins.push(new HtmlWebpackPlugin({
      template: join(__dirname, 'index.html')
    }))
    const compiler = webpack(webpackConfig);
    const devMiddleWare = WebpackDevMiddleware(compiler, {
      writeToDisk: true
    });
    // dist/main.js dist/index.js
    /**
     * this.app.use((req, res, next) => {
     * const content = fs.readFileSync('./dist/index.js')
     * return content;
     * })
     */
    this.app.use(devMiddleWare);
    this.app.use((req, res, next) => {
      res.send(compiler.outputFileSystem.readFileSync(join(__dirname, 'dist/index.html'), 'utf8'))
    })
    return devMiddleWare;
  }
  async start ( ) {
    const devServer = this.setWebpackConfig();
    devServer.waitUntilValid(() => {
      let listenApp = http.createServer(this.app);
      listenApp.listen(8000, () => {
        console.log('服务已经在8000端口启动');
      })
    })
  }
}
module.exports = Server;