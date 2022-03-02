import { func } from "../../../node_modules/@redux-saga/is";

let workInProgress; // 表示一个工作单元，正在处理的fiber
let TAG_ROOT = 'root';

// let VirtualDom = (
//   <div key="A1">
//     <div key="B1">B1</div>
//     <div key="B2">B2</div>
//   </div>
// )

let style = { border: '1px solid red', margin: '20px' };

let A = {
  type: 'div',
  key: 'A',
  props: {
    style: {},
    children: [
      'A',
      {type: 'div', key: 'B1', props: {style, children: 'B1文本'}},
      {type: 'div', key: 'B2', props: {style, children: 'B2文本'}}
    ]
  }
}

function workLoop() {
  while (workInProgress) { // 如果有任务就执行
    workInProgress = performUnitOfWork(workInProgress); //执行完成会返回下一个任务
  }
}

let root = document.getElementById('root');

// Filber 是一个普通的js对象
let rootFilber = {
  type: TAG_ROOT,
  key: 'ROOT',
  stateNode: root,
  props: {
    children: [A]
  }
}

workInProgress = rootFilber;

function performUnitOfWork(workInProgress) {
  console.log(workInProgress);
  beginWork(workInProgress);
} 

/**
 * 根据当前的Fiber和虚拟DOM树构建Fiber树
 * @param {} workInProgress 
 */
function beginWork(workInProgress) {
  console.log('beginWork', workInProgress.key);
  const nextChildren = workInProgress.props.children;
  return reconcileChildren(workInProgress, nextChildren);
}

function reconcileChildren(returnFilber, nextChildren) {

}

workLoop();
