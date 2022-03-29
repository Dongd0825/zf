let mkdirp = require("mkdirp"); //创建文件夹
let { writeFileSync, write } = require('fs');
let { join, dirname } = require('path');
let { absTmpPath } = require('./getPaths');

/**
 * 向临时文件夹下面写文件
 * @param {*} path 
 * @param {*} content 
 */
function writeTmpFile({path, content}) {
  // 获取写入的绝对路径
  const absPath = join(absTmpPath, path);
  // 保证此目录的文件夹是存在的，如果不存在则先建立文件夹
  mkdirp(dirname(absPath));
  writeFileSync(absPath, content, 'utf-8');
}

module.exports = writeTmpFile