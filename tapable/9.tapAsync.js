// - 异步注册
// - 有一个任务返回错误就直接调最终的回调
let {AsyncParallelBailHook} = require('tapable');
// TODO
// class AsyncParallelBailHook{
//   constructor() {
//     this.taps=[];
//   }
//   tapAsync(key, fn) {
//     this.taps.push(fn);
//   }
//   callAsync(...args) {
//     const finalCallback = args.pop();
//     let count=0, total = this.taps.length;
//     function done (err) {
//       if (err) {
//         return finalCallback();
//       } else {
//         if (++count == total) {
//           return finalCallback();
//         }
//       }
//     }
//     for (let i = 0; i < this.taps.length; i++) {
//       // console.log('this.taps', this.taps[i]);
//       this.taps[i](...args, done);
//     }
//   }
// }
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
  