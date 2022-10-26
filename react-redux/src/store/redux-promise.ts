
export function promise ({getState, dispatch}) { // 此时dispatch为新的dispatch 包裹的dispatch
  return function(next){ // next为老dispatch方法
    debugger
    return function (action) { // 此方法为我们改造后的dispatch方法
      if (action.then && typeof action.then === 'function') {
        action.then(dispatch);
      } else {
        return next(action)
      }
    }
  }
}
