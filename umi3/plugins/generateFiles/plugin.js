const Mustache = require('mustache') // handlerbar ejs jade
const writeTmpFile = require('../../lib/writeTmpFile');
const { join } = require('path');
const { readFileSync, statSync, existsSync} = require('fs');
const { absSRCPath } = require('./getPaths');
const { winPath } = require('../../lib/utils');

/**
 * 写入临时文件
 */

 const plugin = (pluginAPI) => {
   let plugins = [];
   if (existsSync(join(absSRCPath, 'app.js'))) {
    plugins.push(join(absSRCPath, 'app.js'));
   }
   pluginAPI.onGenerateFiles(async () => {
    const pluginTPL = readFileSync(join(__dirname, 'plugin.tpl'), 'utf-8');
    let content = Mustache.render(pluginTPL, {
      plugins: plugins.map((plugin, index) => {
        return {
          index, 
          path: winPath(plugin)
        }
      }) 
    });
    writeTmpFile({
      path: 'core/plugin.js',
      content
    })
   })
 }

 module.exports = plugin;