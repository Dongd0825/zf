let promise = (middlewareAPI) => (next) => (action) => {
  console.log("promise");
  next(action)
}

let thunk = (middlewareAPI) => (next) => (action) => {
  console.log("thunk");
  next(action)
}

let logger = (middlewareAPI) => (next) => (action) => {
  console.log("logger");
  next(action)
}

function compose(...fns) {
  return function(args) {
    for(let i = fns.length - 1; i >= 0; i--) {
      args = fns[i](args);
    }
    return args;
  }
}

// 洋葱模型 koa相同的 洋葱模型
// 包裹 comppose组合 looger =》 thunk =》 promise
// 执行 promise -》 thunk =》 logger
// 组合从右向左
// 执行从左向右
const chain = [promise, thunk, logger].map((fn) => fn({}))
const composed = compose(...chain);
const dispatch = () => {
  console.log('这里是dispatch方法')
}
const newDispatch = composed(dispatch)
newDispatch({type: 'ADD'});