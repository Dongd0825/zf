const Mustache = require('mustache') // handlerbar ejs jade
const writeTmpFile = require('../../lib/writeTmpFile');
const { join } = require('path');
const { readFileSync} = require('fs');

/**
 * 写入临时文件
 */

 const plugin = (pluginAPI) => {
   pluginAPI.onGenerateFiles(async () => {
    const routesTPL = readFileSync(join(__dirname, 'routes.tpl'), 'utf-8');
    const routes = [];
    let content = Mustache.render(routesTPL, {
      routes: JSON.stringify(routes)
    });
    writeTmpFile({
      path: 'core/routes.js',
      content
    })
   })
 }

 module.exports = plugin;