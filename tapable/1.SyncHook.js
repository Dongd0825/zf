// const {SyncHook} = require('tapable');

class SyncHook {
  constructor(args) {
    this.args = args;
    this.taps = [];
  }
  tap(key, fn) {
    this.taps.push(fn);
  }
  call(...args) {
    this.taps.forEach((fn) => {
      fn.apply(this, args);
    })
  }
}

const hook = new SyncHook(['name','age']);
hook.tap('1',(name,age)=>{
  console.log(1,name,age);
  return 1;
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