//异步串行钩子
//任务一个一个执行,执行完上一个执行下一个

// let { AsyncSeriesHook } = require('tapable');
class AsyncSeriesHook {
  constructor() {
      this.taps = [];
  }
  tapAsync(name,fn) {
    this.taps.push(fn);
  }
  callAsync() {
      let args = Array.from(arguments);
      let finalCallback = args.pop();
      let index = 0;
      let next = () => {
        let fn = this.taps[index++];
        if (fn) {
          fn(...args, next);
        } else {
          finalCallback();
        }
      }
      next();
  }
}
let queue = new AsyncSeriesHook(['name']);
console.time('cost');
queue.tapAsync('1',function(name,callback){
   setTimeout(function(){
       console.log(1);
   },1000)
});
queue.tapAsync('2',function(name,callback){
    setTimeout(function(){
        console.log(2);
        callback();
    },2000)
});
queue.tapAsync('3',function(name,callback){
    setTimeout(function(){
        console.log(3);
        callback();
    },3000)
});
queue.callAsync('zfpx',err=>{
    console.log(err);
    console.timeEnd('cost');
});