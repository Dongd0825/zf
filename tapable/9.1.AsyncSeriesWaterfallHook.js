//let { AsyncSeriesWaterfallHook } = require('tapable');
class AsyncSeriesWaterfallHook {
  constructor() {
      this.taps = [];
  }
  tap(name, fn) {
      this.taps.push(fn);
  }
  callAsync(...args) {
    const finalCallback = args.pop();
    let ret = args[0];
    for (let i = 0; i < this.taps.length; i++) {
      ret = this.taps[i](ret, ...args.slice(1));
    }
    finalCallback();
  }
}
let queue = new AsyncSeriesWaterfallHook(['name', 'age']);
console.time('cost');
queue.tap('1', function (name, age) {
  console.log(1, name, age);
  return 'return1';
});
queue.tap('2', function (data, age) {
  console.log(2, data, age);
  return 'return2';
});
queue.tap('3', function (data, age) {
  console.log(3, data, age);
});
queue.callAsync('zfpx', 10, err => {
  console.log(err);
  console.timeEnd('cost');
});