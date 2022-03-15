import React from 'react';
import ReactDOM from 'react-dom';
import { IndeterminateComponent } from './ReactWorkTags';
import {render} from './ReactFiberWorkLoop';

ReactDOM.render(
  <React.StrictMode>
    <Counter />
  </React.StrictMode>,
  document.getElementById('root')
);

function reducer(state, action) {
  if (action.type === 'add') {
    return state + 1;
  } else {
    return state;
  }
}

function Counter() {
  console.log('a');
  
  const [number, dispatch] = React.useReducer(reducer, 0)
  return (
    <div>
      <div onClick={() => dispatch({type: 'add'})}>{number}</div>
    </div>
  )
}

let counterFiber = {
  tag: IndeterminateComponent, // fiber类型， 函数组件在初次渲染时候对映的类型
  type: Counter, // 组件的具体类型
  alternate: null, // 上一个渲染的fiber. 相当于替身
}

render(counterFiber);
