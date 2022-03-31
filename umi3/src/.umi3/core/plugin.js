class Plugin{
  constructor() {
    this.hooks = {}
  }
  // {apply:{patchRoutes: fn}}
// {patchRoutes: fn}2
  register(plugin) {
    Object.keys(plugin.apply).forEach(key => {
      // if (!this.hooks[key]) {
      //   this.hooks[key] = []
      // } else {
      //   this.hooks[key] = this.hooks[key].concat(plugin.apply[key])
      // }
      console.log('register',plugin.apply[key] );
      this.hooks[key] = (this.hooks[key] || []).concat(plugin.apply[key])
    })
  }

  applyPlugins({key, args}) {
    if (!this.hooks[key]) {
      this.hooks[key] = [];
    }
    console.log('applyPlugins',this.hooks[key] )
    this.hooks[key].forEach(hook => {hook(args); console.log(hook(args))});
  }
}

let plugin = new Plugin();

import * as Plugin_0 from '/Users/dongdi/Desktop/code/zf/umi3/src/app.js';

plugin.register({
  apply: Plugin_0,
  path: '/Users/dongdi/Desktop/code/zf/umi3/src/app.js'
})


export default plugin;
