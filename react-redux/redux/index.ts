type IReducer = (state: any, action: IAction) => any;
type IAction = {type: string};

export function createStore (reducer: IReducer) {
  let store: any;
  let listeners: (()=>void)[] = [];

  function getState() {
    return store;
  }

  function subscribe(listener: any) {
    listeners.push(listener);
    return () => {
      let index = listeners.indexOf(listener);
      listeners.splice(index, 1);
    }
  }

  function dispatch(action: IAction) {
    store = reducer(store, action);
    for (let listener of listeners) {
      listener();
    }
  }

  dispatch({type: '@@/init'});

  return {
    getState,
    subscribe,
    dispatch
  };
}

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

/**
 * 
 * @param actionCreator 
 * +function add() {
+    return { type: 'ADD' };
 * +}
 * @param dispatch 
 * @returns 
 */
export function bindActionCreator(actionCreator: any, dispatch: any) {
  return function (...args: any) {
    dispatch(actionCreator.apply(null, args));
  }
}

/**
 * +function add() {
+    return { type: 'ADD' };
+}
+function minus() {
+    return { type: 'MINUS' };
+}
+const actions = { add, minus };
 * @param actionCreators  actions
 * @param dispatch 
 * @returns 
 */
export function bindActionCreators(actionCreators: Record<string, any>, dispatch: any) {
  const boundActionCreators: any = {}
  for (const key in actionCreators) {
      const actionCreator = actionCreators[key]
      if (typeof actionCreator === 'function') {
          boundActionCreators[key] = bindActionCreator(actionCreator, dispatch)
      }
  }
  return boundActionCreators
}
