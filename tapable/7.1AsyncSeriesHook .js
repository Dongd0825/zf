//异步串行钩子
//任务一个一个执行,执行完上一个执行下一个

// let { AsyncSeriesHook } = require('tapable');
class AsyncSeriesHook {
    constructor() {
        this.taps = [];
    }
    tap(name, fn) {
        this.taps.push(fn);
    }
    callAsync() {
        let args = Array.from(arguments);
        let finalCallback = args.pop();
        for (let i = 0; i < this.taps.length; i++) {
            let fn = this.taps[i];
            fn(...args);
        }
        finalCallback();
    }
}
let queue = new AsyncSeriesHook(['name']);
console.time('cost');
queue.tap('1', function (name) {
    console.log(1);
});
queue.tap('2', function (name) {
    console.log(2);
});
queue.tap('3', function (name) {
    console.log(3);
});
queue.callAsync('zhufeng', err => {
    console.log(err);
    console.timeEnd('cost');
});