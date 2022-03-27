/**
 * 命令的注册和执行
 */
let pluginAPI = require('./pluginAPI');
const {
  AsyncParallelHook
} = require("tapable");

class Service {
  constructor(opts) {
    // key name value fn {dev: {fn}}
    this.commands = {};//存放着所有命令和它们的 实现
    this.plugins = opts.plugins;// [{id: 'dev',apply: pluginDev}]
    this.hooksByPluginId = {}; // 安插件ID绑定的钩子{插件ID， 【hook】}
    this.hooks = {} // 钩子是按照类型划分的 {'event':【{hook}】}
  }
  async init () {
    for (let plugin of this.plugins) {
      let pluginApi = new pluginAPI({id: plugin.id, service: this});
      pluginApi.onGenerateFiles = (fn) => {
        pluginApi.register({
          pluginId: plugin.id,
          key: 'onGenerateFiles',
          fn 
        })
      }
      plugin.apply(pluginApi);
    }
    // 按照事件分类来分组
    Object.keys(this.hooksByPluginId).forEach(pluginId => {
      let pluginHooks = hooksByPluginId[pluginId];
      pluginHooks.forEach(hook => {
        const {key} = hook;
        hook.pluginId = pluginId;
        this.hooks[key] = (this.hooks[key] || []).concat(hook);
      })
    })
  }
  async applyPlugins(opts) {
    let hooksForKey = this.hooks[opts.key] || [];
    // AsyncServicesWaterfallhook 源码
    let tEvent = await AsyncParalleHook(['_']);
    for(const hook of hooksForKey) {
      tEvent.tabPromise({name: hook.pluginId}, hook.fn);
    }
    return await tEvent.promise();
  }
  async run(args) {
    this.init();
    return this.runCommand(args);
  }
  async runCommand({name}) {
    const command = this.commands[name];
    return command.fn();
  }
}

module.exports = Service;