//异步串行钩子
//任务一个一个执行,执行完上一个执行下一个

// let { AsyncSeriesHook } = require('tapable');
class AsyncSeriesHook {
  constructor() {
      this.taps = [];
  }
  tapPromise(name,fn) {
    this.taps.push(fn);
  }
  promise(...args) {
    const [first, ...fns] = this.taps;
    return fns.reduce((pre, cur) => {
      return pre.then(() => cur(...args))
    }, first(...args))
  }
}
let queue = new AsyncSeriesHook(['name']);
console.time('cost');
queue.tapPromise('1', function (name) {
    return new Promise(function (resolve) {
        setTimeout(function () {
            console.log(1, name);
            resolve();
        }, 1000)
    });
});
queue.tapPromise('2', function (name) {
    return new Promise(function (resolve) {
        setTimeout(function () {
            console.log(2, name);
            resolve();
        }, 2000)
    });
});
queue.tapPromise('3', function (name) {
    return new Promise(function (resolve) {
        setTimeout(function () {
            console.log(3, name);
            resolve();
        }, 3000)
    });
});
queue.promise('zfpx').then(data => {
    console.log(data);
    console.timeEnd('cost');
});