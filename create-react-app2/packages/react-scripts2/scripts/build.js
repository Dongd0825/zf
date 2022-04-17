
// Makes the script crash on unhandled rejections instead of silently
// ignoring them. In the future, promise rejections that are not handled will
// terminate the Node.js process with a non-zero exit code.
process.on('unhandledRejection', err => {
  throw err;
});

//1, 设置环境变量
// Do this as the first thing so that any code reading it knows the right env.
process.env.BABEL_ENV = 'production';
process.env.NODE_ENV = 'production';

//2. 获取webpack配置文件
// Generate configuration
const configFactory = require('../config/webpack.config');
const config = configFactory('production');
const paths = require('../config/path');
const fs = require('fs-extra');
const webpack = require('webpack');
const chalk = require('chalk');

//3. 如果buid目录不为空，则把build目录清空
fs.emptyDirSync(paths.appBuild);

//4. 拷贝public下面的静态文件到build目录
// Merge with the public folder
copyPublicFolder();
build();

function build() {
  const compiler = webpack(config,(err, stats) => {
    if (err) {
      console.error(err);
      return;
    }
    console.log('stats',stats);//打包后的结果
    console.log(`${chalk.green('Compiled Successfully!')}`)
  });
}

// TODO public文件的内容从哪里生成？cra-template
function copyPublicFolder() {
  fs.copySync(paths.appPublic, paths.appBuild, {
    filter: file => file !== paths.appHtml//index。html 由插件处理
  })
}
