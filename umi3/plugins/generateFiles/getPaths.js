const { existsSync, statSync} = require('fs');
const { join } = require('path');

/**
 * 判断是否存在 且是目录
 * @param {} path 
 * @returns 
 */
function isDirectoryAndExsit(path) {
  return existsSync(path) && statSync(path).isDirectory();
}

// 获取当前的工作目录
let cwd = process.cwd();
// SRC的绝对路径
let absSRCPath = cwd;

if (isDirectoryAndExsit(join(absSRCPath, 'src'))) {
  absSRCPath = join(absSRCPath, 'src');
}

const absPagesPath = join(absSRCPath, 'pages');
const tmpDir = '.umi3';
const absTmpPath = join(absSRCPath, tmpDir);

module.exports = {
  absSRCPath, // SRC目录下的绝对路径
  absPagesPath, // 约定式路由 pages下面的文件是路由文件
  tmpDir, // 临时文件名
  absTmpPath, // 临时文件绝地路径
} 