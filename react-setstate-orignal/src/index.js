import React from 'react';
import ReactDOM from 'react-dom';
import Counter from './Counter';

// 同步模式
ReactDOM.render(
  <Counter/ >,
  document.getElementById('root')
);


// ReactDOM.unstable_createRoot(document.getElementById('root')).render(<Counter></Counter>)


/**
 * 批量异步 17 稳定版，非并非模式
 * React17+ 开发版 并非模式
 */
// 目前的cra是开发版本

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
