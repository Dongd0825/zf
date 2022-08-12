//- 异步注册，全部任务完成后执行最终的回调
// let {AsyncParallelHook}=require('tapable');

class AsyncParallelHook {
  constructor(args) {
    this._args = args;
    this.taps = [];
    this.tapsAsync = [];
  }
  tap(key, fn) {
    this.taps.push(fn);
  }
  tapAsync(key, fn) {
    this.tapsAsync.push(fn);
  }
  callAsync(...args) {
    let count = 0;
    const finalCallback = args.pop();
    const len = this.tapsAsync.length;
    function done(err) {
      if (++count === len) {
        finalCallback(err);
      }
    }
    this.tapsAsync.forEach((fn, i) => {
      fn.apply(this, [...args, done]);
    })
  }
}

let queue = new AsyncParallelHook(['name']);
console.time('cost');
queue.tapAsync('1',function(name,callback){
    setTimeout(function(){
        console.log(1);
        callback();
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
