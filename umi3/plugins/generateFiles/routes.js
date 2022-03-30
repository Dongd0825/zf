const Mustache = require('mustache') // handlerbar ejs jade
const writeTmpFile = require('../../lib/writeTmpFile');
const { join } = require('path');
const { readFileSync} = require('fs');
const getRoutes = require('../../lib/getRoutes');
const { absPagesPath } = require('../generateFiles/getPaths');

/**
 * 写入临时文件
 */

 const plugin = (pluginAPI) => {
   pluginAPI.onGenerateFiles(async () => {
    const routesTPL = readFileSync(join(__dirname, 'routes.tpl'), 'utf8');
    const routes = getRoutes({root: absPagesPath });
    let content = Mustache.render(routesTPL, {
      routes: JSON.stringify(routes, replacer, 2).replace(/\"component\": (\"(.+?)\")/g, (_, m1, m2) => {
        return `"component":${m2.replace(/\^/g, '"')}`
      })
    });
    writeTmpFile({
      path: 'core/routes.js',
      content
    })
   })
 }

 function replacer(key, value) {
  switch(key) {
    case 'component': 
      return `require(${value}).default`;
    default:
      return value;
  }
 }

 module.exports = plugin;