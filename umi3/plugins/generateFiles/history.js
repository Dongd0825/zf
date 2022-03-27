/**
 * 写入临时文件
 */

 const plugin = (pluginAPI) => {
   pluginAPI.onGenerateFiles(async () => {
     console.log('开始写文件');
   })
 }

 module.exports = plugin;