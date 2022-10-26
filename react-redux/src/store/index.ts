
import { combineReducers, compose, createStore } from '../../redux';
import { counter1, counter2 } from './reducers';
import {promise as promiseMiddleware} from './redux-promise';

const combinedReducers = combineReducers({
  counter1,
  counter2
});

// const store = createStore(combinedReducers);

// 基本思路 重写dispatch方法 不优雅
// let dispatch = store.dispatch;
// store.dispatch = function (action) {
//     setTimeout(() => {
//         dispatch(action);
//     }, 1000);
//     return action;
// };

function logger ({getState, dispatch}) { // 此时dispatch为新的dispatch 包裹的dispatch
  return function(next){ // next为老dispatch方法
    return function (action) { // 此方法为我们改造后的dispatch方法
      console.log('老状态', getState());
      next(action);//调用原始的dispatch方法 传入动作action 发给仓库 仓库里会调用reducer
      console.log('新状态', getState());
      return action
    }
  }
}

function thunk ({getState, dispatch}) { // 此时dispatch为新的dispatch 包裹的dispatch
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

// 可扩展方法
// 应用中间件 包裹store 重写dispatch方法
// function applyMiddleware(middleware) {
//   return function(createStore) {
//     return function(reducers) {
//       const store = createStore(reducers)
//       let dispatch;
//       const middlewareAPI = {
//         getState: store.getState,
//         dispatch: (action) => dispatch(action)
//       }
//       dispatch = middleware(middlewareAPI)(store.dispatch);
//       return {
//         ...store,
//         dispatch
//       }
//     }
//   }
// }
// 支持多middleware
function applyMiddleware(...middleware) {
  return function(createStore) {
    return function(reducers) {
      const store = createStore(reducers)
      let dispatch;
      const middlewareAPI = {
        getState: store.getState,
        dispatch: (action) => dispatch(action)
      }
      const chain = middleware.map(middleware => middleware(middlewareAPI));
      dispatch = compose(chain)(store.dispatch)
      return {
        ...store,
        dispatch
      }
    }
  }
}

const store = applyMiddleware(promiseMiddleware, thunk, logger)(createStore)(combinedReducers)

export default store;