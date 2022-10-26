
export function thunk ({getState, dispatch}) { // 此时dispatch为新的dispatch 包裹的dispatch
  return function(next){ // next为老dispatch方法
    return function (action) { // 此方法为我们改造后的dispatch方法
      if (typeof action === 'function') {
        return action({getState, dispatch});
      } else {
        return next(action)
      }
    }
  }
}
