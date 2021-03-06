const Mustache = require('mustache') // handlerbar ejs jade
const writeTmpFile = require('../../lib/writeTmpFile');
const { join } = require('path');
const { readFileSync} = require('fs');

/**
 * 写入临时文件
 */

 const plugin = (pluginAPI) => {
   pluginAPI.onGenerateFiles(async () => {
    const historyTPL = readFileSync(join(__dirname, 'history.tpl'), 'utf-8');
    let content = Mustache.render(historyTPL);
    writeTmpFile({
      path: 'core/history.js',
      content
    })
   })
 }

 module.exports = plugin;