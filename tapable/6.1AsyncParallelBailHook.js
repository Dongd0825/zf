// - 带保险的异步并行执行钩子
// - 有一个任务返回值不为空就直接结束

// let {AsyncParallelBailHook} = require('tapable');
class AsyncParallelBailHook{
  constructor() {
    this.taps=[];
  }
  tap(name,fn) {
      this.taps.push(fn);
  }
  callAsync(...args) {
    const finalCallback = args.pop();
    let ret;
    for (let i = 0; i < this.taps.length; i++) {
      ret = this.taps[i](args);
      if (ret) {
        finalCallback(ret);
        break;
      }
    }
  }
}

let queue=new AsyncParallelBailHook(['name']);
console.time('cost');
queue.tap('1',function(name){
    console.log(1);
    return "Wrong";
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