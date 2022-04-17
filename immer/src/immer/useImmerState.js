import { toProxy, INTERNAL } from "./core";
import React, {useState, useRef} from 'react';
import { isObject} from './is';

const useImmerState = (baseState) => {
  const [state, setState] = useState(baseState);
  let proxy = toProxy(baseState, () => {
    const internal = draftRef.current[INTERNAL];
    const newState = internal.draftState;
    setState(() => {
      return isObject(newState) ? {...newState} : [...newState]; // 返回一个新的state， 让组件重新render
    })
    // setState({...newState})
  });
  const draftRef = useRef(proxy);
  const updateState = (produce) =>{ 
    produce(draftRef.current); 
    console.log('3');
  }

  return [state, updateState] // 返回最新的state和producer
}

export default useImmerState;