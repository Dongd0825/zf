const { absPagesPath } = require('../plugins/generateFiles/getPaths');
const { existsSync, readdirSync, statSync} = require('fs');
const { join, basename, extname, relative } = require('path');
const { winPath } = require('./utils');

function getRoutes(opts) {
  const { root, relDir = "" } = opts; // relDir 子目录
  const files = getFiles(join(root, relDir)); //  获取此目录下的所有文件列表
  const routes = files.reduce(filteToRouteReducer.bind(null, opts), [])
   return routes;
}

// 生成routes
// {
//   "path": "/",
//   "exact": true,
//   "component": require('@/pages/index.js').default
// },
function filteToRouteReducer(opts, routes, file) {
  const { root, relDir = '' } = opts
  const absPath = join(root, relDir, file);
  console.log('absPath',absPath);
  // TODO
  if (statSync(absPath).isDirectory()) {
    console.log('sss');
    const relFile = join(relDir, file); // user
    const layoutPath = join(root, relFile, '_layout.js');

    const route = {
      path: normalizePath(relFile),
      routes: getRoutes({
        ...opts,
        relDir: relFile
      })
    }

    if (existsSync(layoutPath)) {
      
      route.component= toComponentPath(root, layoutPath)
    } 
    routes.push(route);
  } else {
    const filename = basename(file, extname(file));
    routes.push({
      path: normalizePath(join(relDir, filename)),
      exact: true,
      component: toComponentPath(root, absPath)
    })
  }
  return routes;
}

function normalizePath(path) {
  path = winPath(path);
  path = `/${path}`;
  path = path.replace(/\/index$/, "/");
  return path;
}

function toComponentPath(root, absPath) {
  return winPath(`'@/${relative(join(root, '..'), absPath)}'`);
}

function getFiles (root) {
  if (!existsSync(root)) return []; // 如果此目录不存在，返回空数组
  return readdirSync(root).filter(file => {
    if (file.charAt(0) === '_' || file.charAt(0) === '.') return false; // _开头忽略 
    return true;
  });
}

// console.log('absPagesPath',absPagesPath);
const routes = getRoutes({root: absPagesPath})
// console.log('routes',routes);

let result = JSON.stringify(routes,replacer, 2);

function replacer(key, value) {
  switch(key) {
    case 'component': 
      return `require(${value}).default`;
    default:
      return value;
  }
 }

 
 result = result.replace(/\"component\": (\"(.+?)\")/g, (_, m1, m2) => {
   return `"component":${m2.replace(/\^/g, '"')}`
 })
 console.log('result', result);

// export default routes;

module.exports = getRoutes