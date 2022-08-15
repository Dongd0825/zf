//异步串行钩子
//- - 只要有一个promise失败了就整个失败了

// let {AsyncSeriesBailHook}=require('tapable');
class AsyncSeriesBailHook {
    constructor(args) {
        this.args = args;
        this.taps = [];
    }
    tapPromise(key, fn) {
        this.taps.push(fn);
    }
    promise(...args) {
        const [first, ...fns] = this.taps;
        return fns.reduce((pre, cur) => {
            return pre.then(() => {
                return cur(...args);
            }, (err) => {
                return Promise.reject(err);
            })
        }, first(...args))
    }
}

let queue = new AsyncSeriesBailHook(['name']);
console.time('cost');
queue.tapPromise('1',function(name){
   return new Promise(function(resolve){
       setTimeout(function(){
           console.log(1);
           resolve();
       },1000)
   });
});
queue.tapPromise('2',function(name,callback){
    return new Promise(function(resolve,reject){
        setTimeout(function(){
            console.log(2);
            reject('失败了');
        },2000)
    });
});
queue.tapPromise('3',function(name,callback){
    return new Promise(function(resolve){
        setTimeout(function(){
            console.log(3);
            resolve();
        },3000)
    });
});
queue.promise('zfpx').then(data=>{
    console.log(data);
    console.timeEnd('cost');
},error=>{
    console.log(error);
    console.timeEnd('cost');
});