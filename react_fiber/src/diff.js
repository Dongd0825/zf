import * as React from 'react';
import * as ReactDOM from 'react-dom';

let oldStyle = { border: '3px solid red', margin: '5px'};
let newStyle = { border: '3px solid green', margin: '5px'};
let root = document.getElementById('root');
let oldVDOM = (
  <ul>
    <li key="A" style={oldStyle}>A</li>
    <li key="B" style={oldStyle}>B</li>
    <li key="C" style={oldStyle}>C</li>
    <li key="D" style={oldStyle}>D</li>
    <li key="E" style={oldStyle}>E</li>
    <li key="F" style={oldStyle}>F</li>
  </ul>
)

ReactDOM.render(oldVDOM, root);

setTimeout(() => {
  let newVDOM = (
    <ul>
      <li key="A" style={newStyle}>A-new</li>
      <li key="C" style={newStyle}>C-new</li>
      <li key="E" style={newStyle}>E-new</li>
      <li key="B" style={newStyle}>B-new</li>
      <li key="G" style={newStyle}>G</li>
    </ul>
  )
  ReactDOM.render(newVDOM, root);
})

// 第一轮循环：比较新A和A，更新A
// B和C比，不一样，跳出第一轮循环，

// 第二轮循环：
// 声明map={ B:'B', C:'C', D:'D', E:'E', F:'F'};
// 继续遍历新的节点
// 去老节点里找是否有C。是否能复用(Fiber和dom结构)，标记C更新。
// C(in map)的老索引2比lastPlacedIndex=0大，C位置不动，map中删除C
// lastPlacedIndex = 2

// E(in map)也可以复用，oldIndex=4>lastPlacedIndex,E不动，map中删除E
// lastPlacedIndex = 4

// B(in map) oldIndex=1 < lastPlacedIndex=4，map中删除B
// B 移动到E后面

// G新增
// DF删除（map里的剩余数据，都是删除）

// 绿色更新，
// 橘色挪动，更新
// 蓝色插入
// 红色删除

// 先删除，才知道新索引