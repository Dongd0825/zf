// - 带保险的异步并行执行钩子
// - 有一个任务返回值不为空就直接结束
// 异步注册
// 只要有一个任务有resolve或者reject值，不管成功失败都结束

// let { AsyncParallelBailHook } = require('tapable');

class AsyncParallelBailHook {
  constructor() {
      this.taps = [];
  }
  tapPromise(name, fn) {
      this.taps.push(fn);
  }
  promise(...args) {
    let promises = this.taps.map(fn => fn(...args));
    // return new Promise((resolve, reject) => {
    //   promises.forEach(promise => {
    //     promise.then((data)=> {
    //       if (data) resolve(data);
    //     }, (error) => {
    //       if (error) reject(error);
    //     })
    //   })
    // })
    return Promise.race(promises)
  }

}

let queue = new AsyncParallelBailHook(['name']);
console.time('cost');
queue.tapPromise('1', function (name) {
    return new Promise(function (resolve, reject) {
        setTimeout(function () {
            console.log(1);
            resolve(1);
        }, 1000)
    });
});
queue.tapPromise('2', function (name) {
    return new Promise(function (resolve, reject) {
        setTimeout(function () {
            console.log(2);
            resolve();
        }, 2000)
    });
});

queue.tapPromise('3', function (name) {
    return new Promise(function (resolve, reject) {
        setTimeout(function () {
            console.log(3);
            resolve();
        }, 3000)
    });
});

queue.promise('zfpx').then((result) => {
    console.log('成功', result);
    console.timeEnd('cost');
}, err => {
    console.error('失败', err);
    console.timeEnd('cost');
})