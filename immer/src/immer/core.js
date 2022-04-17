import { isArray, isObject, isFunction } from './is';
/**
 * baseState 原状态
 * producer 处理器或者生产者
 */
export function produce(baseState, producer) {
  let proxy = toProxy(baseState);
  producer(proxy);
  const internal = proxy[INTERNAL];
  return internal.mutated ? internal.draftState : internal.baseState;
}

export let INTERNAL = Symbol('INTERNAL');

export function toProxy(baseState, callParentCopy) {
  // 记录代理的属性。 访问哪个才代理哪个
  let keyToProxy = {}
  // 内部状态
  let internal = {
    baseState,
    draftState: createDraftState(baseState),// {list: baseState.list}
    keyToProxy,
    mutated: false,//本对象是否发生变更
  }
  
  return new Proxy(baseState, {
    get: (target, key) => {
      if (key === INTERNAL) {
        return internal;
      }
      let value = target[key];
      // 当访问某个属性的时候，我们就要对这个属性进行代理
      if (isObject(value) || isArray(value)) {
        if (key in keyToProxy) {
          return keyToProxy[key];
        } else {
          keyToProxy[key] = toProxy(value, () => {
            internal.mutated = true; // 任意一个儿子改变，自己也要改变
            const proxyChild = keyToProxy[key];
            let { draftState: childDraftState} = proxyChild[INTERNAL];
            internal.draftState[key] = childDraftState; // 自己的draft指向儿子的draft
            callParentCopy && callParentCopy(); // 递归让自己父亲也改变
          }); //  引用类型，得到代理对象，返回引用类型
        }
        return keyToProxy[key];
      } else if (isFunction(value)) {
        internal.mutated = true;
        callParentCopy && callParentCopy();
        return value.bind(internal.draftState); // push 的this指针指向draftState
      }
      return internal.mutated ? internal.draftState[key] : internal.baseState[key];
    },
    set: (target, key, value) => {
      internal.mutated = true;
      const { draftState } = internal; // 设置值，修改draftState，不修改baseState
      draftState[key] = value;
      callParentCopy && callParentCopy();
      return true; // 一定要返回true ，否则报错
    }
  })
}

// 浅copy
function createDraftState(baseState) {
  if (isObject(baseState)) {
    return Object.assign({}, baseState);
  } else if (isArray(baseState)) {
    return Object.assign([], baseState);
  } else { // set map，   ....
    return baseState; // 基本类型，数字，字符串。。。
  }
}