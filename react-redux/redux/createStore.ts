import { IAction, IReducer } from "./interface";

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