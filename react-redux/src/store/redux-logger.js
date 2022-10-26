
export function logger ({getState, dispatch}) { // 此时dispatch为新的dispatch 包裹的dispatch
  return function(next){ // next为老dispatch方法
    return function (action) { // 此方法为我们改造后的dispatch方法
      console.log('老状态', getState());
      next(action);//调用原始的dispatch方法 传入动作action 发给仓库 仓库里会调用reducer
      console.log('新状态', getState());
      return action
    }
  }
}
