import { useCallback, useContext, useLayoutEffect } from "react";
import ReactReduxContext from '../ReactReduxContext'
import shallowEqual from '../shallowEqual'
import React, {useReducer} from 'react'

function useSelector(selector, equalityFn=shallowEqual) {
  const {store} = useContext(ReactReduxContext);
  let lastSelectedState = React.useRef(null);
  //获取仓库中的最新的状态
  const state = store.getState()
  const selectedState = selector(state);
  //每次计算完selectedState之后会判断状态变化了没有，如果变化 了，组件会刷新，如果没变化组件不刷新
  let [,forceUpdate] = useReducer(x=>x+1,0);

  // 订阅状态
  // 微任务 在页面渲染前执行
  useLayoutEffect(() => store.subscribe(() => {
    //比较老状态和新选中状态是否相等，如果相等，不刷新
    let selectedState = selector(store.getState());
    if(!equalityFn(lastSelectedState.current,selectedState)) {
      console.log('重新render');
      forceUpdate();
      //如何获取 最新的状态值  定义useEffect,然后给lastSelectedState.current赋值，可以在任何地方通过lastSelectedState.current取到新的值
      lastSelectedState.current = selectedState;
    }
  }))
  // 18才支持的心hook 可以替代上述订阅方式
  // selectedState = useSyncExternalStore(store.subscribe, selector(store.getState()))

  return selectedState;
}

export default useSelector;