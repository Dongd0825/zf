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

{{#plugins}}
import * as Plugin_{{{index}}} from '{{{path}}}';
{{/plugins}}

{{#plugins}}
plugin.register({
  apply: Plugin_{{{index}}},
  path: '{{{path}}}'
})
{{/plugins}}


export default plugin;
