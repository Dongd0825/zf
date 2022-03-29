const {
  AsyncParallelHook
} = require("tapable");
let hook1 = {key: 'click', fn: async () => Promise.resolve()}
let hook2 = {key: 'click', fn: async () => {console.log('hook2 click');Promise.resolve()}}

let hook3 = {key: 'mousemove', fn: async () => {console.log('hook3');Promise.resolve()}}
let hook4 = {key: 'mousemove', fn: async () => {console.log('hoo4');Promise.resolve()}}

// hook 有很多插件，每个插件可能会注册多个hook，每个hook的事件类型不一样

let hooksByPluginId = {
  'plugin1': [hook1, hook3],
  'plugin2': [hook2, hook4]
}

let hooks = {};

// 按照事件分类来分组
Object.keys(hooksByPluginId).forEach(pluginId => {
  let pluginHooks = hooksByPluginId[pluginId];
  pluginHooks.forEach(hook => {
    const {key} = hook;
    hook.pluginId = pluginId;
    hooks[key] = (hooks[key] || []).concat(hook);
  })
})

async function applyPlugins(opts) {
  let hooksForKey = hooks[opts.key] || [];
  let tEvent = await AsyncParalleHook(['_']);
  for(const hook of hooksForKey) {
    tEvent.tabPromise({name: hook.pluginId}, hook.fn);
  }
  return await tEvent.promise();
}

applyPlugins({key: 'click'});