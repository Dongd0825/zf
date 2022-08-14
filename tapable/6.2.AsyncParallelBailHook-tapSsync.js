// - 带保险的异步并行执行钩子
// - 有一个任务返回值不为空就直接结束
// 异步注册
// 有一个任务返回错误就直接调最终的回调

// let {AsyncParallelBailHook} = require('tapable');

class AsyncParallelBailHook{
  constructor() {
      this.taps=[];
  }
  tapAsync(name,fn) {
      this.taps.push(fn);
  }
  callAsync() {
      let args=Array.from(arguments);
      let finalCallback=args.pop();
      let count=0,total=this.taps.length;
      let doned = false;
      function done(err) {
          if (err) {
            doned = true;
              return finalCallback(err);
          } else {
              if (++count == total) {
                  return finalCallback();
              }
          }
      }
      for (let i=0;i<total;i++){
          if (doned) break;
          let fn=this.taps[i];
          fn(...args,done);
      }
  }
}
let queue=new AsyncParallelBailHook(['name']);
console.time('cost');
queue.tapAsync('1',function(name,callback){
    console.log(1);
    callback('Wrong');
});
queue.tapAsync('2',function(name,callback){
    console.log(2);
    callback();
});
queue.tapAsync('3',function(name,callback){
    console.log(3);
    callback();
});
queue.callAsync('zfpx',err=>{
    console.log(err);
    console.timeEnd('cost');
});