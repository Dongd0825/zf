import EventEmitter from 'events';
import runSaga from './runSaga';

export default function createSagaMiddleware () { // 此时dispatch为新的dispatch 包裹的dispatch
  let channel = new EventEmitter();
  let boundRunSaga: any;
  function sagaMiddleware({getState, dispatch}){ // next为老dispatch方法
    //绑定 channel dispatch getState方法
    boundRunSaga = runSaga.bind(null, {channel, dispatch, getState})// TODO
    return function (action) { // 此方法为我们改造后的dispatch方法
      const result = dispatch(action); // 不能修改之前的逻辑，只是中间穿插 emit触发逻辑
      channel.emit(action.type, action);
      return result;
    }
  }
  sagaMiddleware.run = (saga) => boundRunSaga(saga)
  return sagaMiddleware
}