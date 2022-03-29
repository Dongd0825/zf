const { absPagesPath } = require('../plugins/generateFiles/getPaths');
const { existsSync, readdirSync} = require('fs');
const { join } = require('path');

function getRoutes(opts) {
  const { root, relDir = "" } = opts; // relDir 子目录
  const files = getFiles(join(root, relDir)); //  获取此目录下的所有文件列表
  console.log(files);
}

function getFiles (root) {
  if (!existsSync(root)) return []; // 如果此目录不存在，返回空数组
  return readdirSync(root).filter(file => {
    if (file.charAt(0) === '_' || file.charAt(0) === '.') return false; // _开头忽略 
    return true;
  });
}

console.log('absPagesPath',absPagesPath);
const routes = getRoutes({root: absPagesPath})
console.log('routes',routes);

// export default routes;