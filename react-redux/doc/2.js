function add1(str) {
  console.log(1)
  return 'add1' + str
}

function add2(str) {
  console.log(2)
  return 'add2' + str
}

function add3(str) {
  console.log(3)
  // 先执行
  return 'add3' + str
}

function compose(...fns) {
  return function(args) {
    for(let i = fns.length - 1; i >=0; i--) {
      args = fns[i](args);
    }
    return args;
  }
}
function compose_yuansheng(...fns){
  return fns.reduce((a,b) => (...args) => a(b(...args)))
}
/**
 * let fns = [add3, add2, add1]
 * 第一次 a=add3 b=add2 返回一个新函数 （args）=> add3(add2(args))
 * 第二次的时候 a = (args）=> add3(add2(args)) b = add1  add3(add2(add1(args))
 * 最终返回 （args） => add3(add2(add1(args))
 */

const fn = compose_yuansheng(add3, add2, add1)
console.log(fn('zf'));