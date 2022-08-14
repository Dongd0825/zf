/**
 * 1. SyncWaterfallHook表示如果上一个回调函数的结果不为undefined,则可以作为下一个回调函数的第一个参数
 * 2. 回调函数接受的参数来自于上一个函数的结果
 * 3. 调用call传入的第一个参数，会被上一个函数的非undefined结果替换
 * 4. 当回调函数返回非undefined不会停止回调栈的调用
 */

// const {SyncWaterfallHook} = require('tapable');
class SyncWaterfallHook {
  constructor(args) {
    this.args = args;
    this.taps = [];
  }
  tap(key, fn) {
    this.taps.push(fn);
  }
  call(...args) {
    let first = args[0];
    let ret;
    for (let i = 0; i < this.taps.length; i++) {
      first = ret || first;
      ret = this.taps[i].apply(this, [first, ...args.slice(1)]);
    }
  }
}

const hook = new SyncWaterfallHook(['name','age']);
hook.tap('1',(name,age)=>{
  console.log(1,name,age);
  return 1;
});
hook.tap('2',(name,age)=>{
  console.log(2,name,age);
  return ;
});
hook.tap('3',(name,age)=>{
  console.log(3,name,age);
  return 3;
});

hook.call('zhufeng',10);