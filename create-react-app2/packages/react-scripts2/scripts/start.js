//1. 设置环境变量
process.env.BABEL_ENV = 'development';
process.env.NODE_ENV = 'development';

//2. 获取webpack配置文件
const configFactory = require('../config/webpack.config');
const config = configFactory('development');

// 3  创建compiler
const webpack = require('webpack');
const compiler = webpack(config);
const webpackDevServer = require('webpack-dev-server');
const chalk = require('chalk');

//4   获取devServer的配置对象
const createDevServerConfig = require('../config/webpackDevServer.config');
const serverConfig = createDevServerConfig();

/**
 * 1.内部启动compier的编译
 * 2.会启动http服务器并返回编译后的结果
 */
const devServer = new webpackDevServer(serverConfig, compiler);
// 5. 启动一个Http开发服务器，监听3000端口
devServer.start(3000, () => {
  console.log(chalk.green('start the devleopment server'))
});



