/**
 * 带保险的 
 * 1. BailHook中的回调函数也是顺序执行的
 * 2. 调用call时传入的参数也可以传给回调函数
 * 3. 当回调函数返回非undefined值的时候会停止调用后续的回调
 */

// const {SyncBailHook} = require('tapable');

class SyncBailHook {
  constructor(args) {
    this.args = args;
    this.taps = [];
  }
  tap(key, fn) {
    this.taps.push(fn);
  }
  call(...args) {
    let ret;
    for(let i = 0; i < args.length; i++) {
      ret = this.taps[i].apply(this, args);
      if (ret) {
        break;
      }
    }
  }
}


const hook = new SyncBailHook(['name','age']);
hook.tap('1',(name,age)=>{
    console.log(1,name,age);
    //return 1;
});
hook.tap('2',(name,age)=>{
    console.log(2,name,age);
    return 2;
});
hook.tap('3',(name,age)=>{
    console.log(3,name,age);
    return 3;
});

hook.call('zhufeng',10);