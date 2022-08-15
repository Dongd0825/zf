//异步串行钩子
//- 只要有一个返回了不为undefined的值就直接结束

// let {AsyncSeriesBailHook}=require('tapable');

class AsyncSeriesBailHook {
    constructor(args) {
        this.args = args;
        this.taps = [];
    }
    tapAsync(key, fn) {
        this.taps.push(fn);
    }
    callAsync(...args) {
        const finalCallback = args.pop();
        let index = 0;
        let next = (err) => {
            if (err) {
                return finalCallback(err);
            }
            let fn = this.taps[index++];
            fn ? fn(...args, next) : finalCallback();
        }
        next();
    }
}

let queue = new AsyncSeriesBailHook(['name']);
console.time('cost');
queue.tapAsync('1',function(name,callback){
   setTimeout(function(){
       console.log(1);
       callback('wrong');
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