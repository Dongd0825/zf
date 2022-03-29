let Server = require('../../lib/Server');
// plugin API
const plugin = (pluginAPI) => {
  // 注册命令 
  // https://umijs.org/zh-CN/plugins/api#registercommand-name-string-alias-string-fn-function-
  pluginAPI.registerCommand({
    name: 'dev',
    desciption: '启动dev服务',
    fn: async function () {
      // 生成临时文件
      await pluginAPI.service.applyPlugins({
        key: 'onGenerateFiles'
      })
      console.log('～～～～启动dev服务');
      new Server().start();
    }
  });
}

module.exports = plugin;