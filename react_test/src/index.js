/**
 * react 是干什么
 * 能干什么
 * 怎么干的
 * ======
 * react是什么？
 * 
 * javascript库
 * 
 * 
 * 声明式（jquery是命令式）
 * 组件化
 * 
 * 高内聚 低耦合
 * 
 * 社区繁荣
 * api变化不大
 * 
 * 跨平台开发
 * =======
 * 算法
 * 小点堆
 * 链表
 * fiber
 * 
 * 为什么引入jsx？
 * 为实现声明式
 * 对js扩展，描述UI样子
 * html语法糖;更像js（为什么不要模版 <div v-on="alert(1)"></div>）
 * 
 * 工作原理：
 * AST抽象语法树
 * （jsx 和 es5语法树不一样）
 */

import React from 'react';
import ReactDOM from 'react-dom';

const App = ReactDOM.render(<h1></h1>, document.getElementById('id'));

class PureComponent {
  shouldComponentUpdate(nextProps, nextState) {
    // 状态或者属性对象不相等，则返回false
    return !isShadowEqual(nextProps, this.props) || !isShadowEqual(nextState, this.state);
  }
}

function isShadowEqual(obj1, obj2) {
  if (obj1 === obj2) {
    return true;
  }

  if (typeof obj1 !== 'object' || obj1 === null || typeof obj2 !== 'object' || obj2 === null ) {
    return false;
  }

  const keys2 = Object.keys(obj2);
  const keys1 = Object.keys(obj1);
  if (keys1.length !== keys2.length) {
    return false;
  }
  for(let key of keys) {
    // obj1[key] !== obj2[key] => Object.is(obj1[key], obj2[key])（0+ 0-） false （‘’  false） false
    if (!obj1.hasOwnProperty(key) || obj1[key] !== obj2[key]) {
      return false;
    }
  }
  return true;
}