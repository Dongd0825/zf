const Mustache = require('mustache') // handlerbar ejs jade
const writeTmpFile = require('../../lib/writeTmpFile');
const { join } = require('path');
const { readFileSync} = require('fs');

/**
 * 写入临时文件
 */

 const plugin = (pluginAPI) => {
   pluginAPI.onGenerateFiles(async () => {
    const umiTPL = readFileSync(join(__dirname, 'umi.tpl'), 'utf-8');
    let content = Mustache.render(umiTPL);
    writeTmpFile({
      path: 'umi.js',
      content
    })
   })
 }

 module.exports = plugin;