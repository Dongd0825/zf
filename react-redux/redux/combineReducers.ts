import { IAction, IReducer } from "./interface";

/**
 * 这是一个高阶 Reducer 的示例，他接收一个拆分后 reducer 函数组成的对象，返回一个新的 Reducer 函数
 * 集成各reducers，将结果放在一个公共对象里
 * 实现命名空间
 * @param reducers 
 * @returns 
 */
 export function combineReducers(reducers: Record<string, IReducer>) {
  let reducerKeys = Object.keys(reducers);
  return function combination (state: any = {}, action: IAction) {
    // 内部集成一个总state对象，集成reducers
    let nextState: any = {};
    // 所有reducer都执行一遍
    for (let key of reducerKeys) {
      let reducer = reducers[key];
      let preStateForKey = state[key];
      let nextStateForKey = reducer(preStateForKey, action);
      nextState[key] = nextStateForKey;
    }
    return nextState;
    // TODO 如果state改变则返回 新state
  }
}