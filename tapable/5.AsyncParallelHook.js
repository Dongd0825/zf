// - 异步并行执行钩子
// let {AsyncParallelHook}=require('tapable');

class AsyncParallelHook{
  constructor(args) {
    this._args = args;
    this.taps = [];
  }
  tap(key, fn) {
    this.taps.push(fn);
  }
  callAsync(...args) {
    const finalCallback = args.pop();
    this.taps.forEach((fn,i) => {
      fn.apply(this, args)
    })
    finalCallback();
  }
}

let queue = new AsyncParallelHook(['name']);
console.time('cost');
queue.tap('1',function(name){
    console.log(1);
});
queue.tap('2',function(name){
    console.log(2);
});
queue.tap('3',function(name){
    console.log(3);
});
queue.callAsync('zfpx',err=>{
    console.log(err);
    console.timeEnd('cost');
});
