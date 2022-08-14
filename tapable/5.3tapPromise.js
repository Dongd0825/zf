// - promise注册钩子
// - 全部完成后执行才算成功

// let {AsyncParallelHook}=require('tapable');

class AsyncParallelHook {
  constructor(args) {
    this._args = args;
    this.taps = [];
    this.tapsAsync = [];
    this.tapsPromise = [];
  }
  tap(key, fn) {
    this.taps.push(fn);
  }
  tapAsync(key, fn) {
    this.tapsAsync.push(fn);
  }
  tapPromise(key, fn) {
    this.tapsPromise.push(fn);
  }
  promise(...args) {
    let promises = this.tapsPromise.map(promise => promise());
    return Promise.all(promises);
  }
}

let queue = new AsyncParallelHook(['name']);
console.time('cost');
queue.tapPromise('1',function(name){
    return new Promise(function(resolve,reject){
        setTimeout(function(){
            console.log(1);
            resolve();
        },1000)
    });

});
queue.tapPromise('2',function(name){
    return new Promise(function(resolve,reject){
        setTimeout(function(){
            console.log(2);
            resolve();
        },2000)
    });
});
queue.tapPromise('3',function(name){
    return new Promise(function(resolve,reject){
        setTimeout(function(){
            console.log(3);
            resolve();
        },3000)
    });
});
queue.promise('zfpx').then(()=>{
    console.timeEnd('cost');
})
