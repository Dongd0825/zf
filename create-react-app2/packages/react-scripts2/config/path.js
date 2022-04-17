'use strict';

const path = require('path');
const appDirectory = process.cwd();//当前的工作路径
const resolveApp = relativePath => path.resolve(appDirectory, relativePath);
console.log('appDirectory',appDirectory)
module.exports = {
  appBuild: resolveApp('build'), //  指向打包后的输出路径，webpack默认是dist
  appHtml: resolveApp('public/index.html'),
  appIndexJs: resolveApp('src/index.js'),
  appPublic: resolveApp('public'),
  appSrc: resolveApp('src'),
}