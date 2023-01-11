import * as effectTypes from './effect-types';

export default function runSaga(env: any, saga: any) {
  let { channel, dispatch } = env;
  let it = typeof saga === 'function'? saga():saga;

  function next(value?: any) {
    let { value: effect, done } = it.next(value);
    if (!done) {
      if (typeof effect[Symbol.iterator] === 'function') { // 可迭代 [] 或者 generator// TOOD 使用什么情况
        runSaga(env, effect); // fork
        next();//不会阻止当前saga继续向后走
      } else if (effect instanceof Promise){
        effect.then(next);
      } else {
        switch(effect.type) {
          case effectTypes.PUT:
            dispatch(effect.action); // dispatch 是老的还是新的 TODO
            next() 
            break;
          case effectTypes.TAKE:
            channel.once(effect.actionType, next) // TOOD effect.actionType ?
            break;
          default:
            break;
        }
      } 
    }
  }
  next();
}