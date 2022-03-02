// let virturlDom = (
//   <div key="A">
//     {/* A */}
//     <div key="B1">B1</div>
//     <div key="B2">B2</div>
//   </div>
// )

let TAG_ROOT = 'root'; // 跟root
let TAG_HOST = 'host'; // 原生dom节点， div,span,li,ul
let workInProgress; // 当前工作的filber
const style = 'border:1px solid black';
let A = {
  type: 'div',
  key: 'A',
  props: {
    style: {},
    children: [
      // 'A',
      {type: 'div', key: 'B1', props: {style: '', children: []}},
      {type: 'div', key: 'B2', props: {style: '', children: []}},
    ]
  }
} 

const root = document.getElementById('root');
let Placement = 'Placement';

let rootFiber = {
  key: 'root',
  tag: TAG_ROOT,
  stateNode: root,
  props: {
    children: [A]
  }
}
workInProgress = rootFiber;

workLoop();

function workLoop() {
  //deadline
  //deadline.timeRemaining() > 1 && 
  while(workInProgress) {
    workInProgress = performUnitWork(workInProgress);
  }
  console.log('rootFiber', rootFiber);
  commitRoot(rootFiber);
}

/** 提交commit */
function commitRoot(rootFiber) {
  let currentEffect = rootFiber.firstEffect;
  while(currentEffect) {
    let flags = currentEffect.flags;
    switch(flags) {
      case Placement: 
        commitPlacement(currentEffect);
        break;
    }
    currentEffect = currentEffect.nextEffect;
  }
}

/**
 * 插入节点
 * @param {}} currentEffect 
 */
function commitPlacement(currentEffect) {
  let parent = currentEffect.return;
  parent.stateNode.appendChild(currentEffect.stateNode);
}

// 执行单元task
function performUnitWork(workInProgress) {
  beginWork(workInProgress); // 父fiber，创建子fiber树
  // 如果有孩子
  if (workInProgress.child) { // 如果创建的fiber有大儿子，则
    return workInProgress.child; // 返回大儿子
  }
  // 如果没有儿子，找弟弟
  while(workInProgress) {
    // 没有儿子完成
    // 也有可能最小的弟弟完成，最小的弟弟让它父亲完成
    competeUnitWork(workInProgress); // 如果没有儿子就结束啦
    // 找弟弟
    if (workInProgress.sibling) {
      return workInProgress.sibling;
    }
    // 没有弟弟，找叔叔
    workInProgress = workInProgress.return;
  }
}

/** 
 * 结束工作单元 
 * 创建真实dom元素
 * 标识要更新的操作
*/
function competeUnitWork(workInProgress) {
  console.log('competeUnitWork', workInProgress.key);
  let stateNode;// 真实dom
  switch(workInProgress.tag) {
    case TAG_HOST: 
      stateNode = createStateNode(workInProgress);
      break;
    case TAG_ROOT:
      break;
  }
  // 在完成工作单元的时候，要判断有没有对应的dom操作 makeEffectList（构建副作用链表）=不是包含所有节点，仅包含副作用的节点（增删改查｜初次渲染的节点都需要插入）
  makeEffectList(workInProgress);
}
/** 单链表
 * 父亲副作用链表 A
 * firstEffect                 lastEffect
 *     |                          |
 *  1.nextEffect-> 2.nextEffect-> 3
 * 
 * 儿子副作用链表 B
 * firstEffect       lastEffect
 *     |                 |
 *  4.nextEffect-> 5.nextEffect
 * 
 * 儿子的副作用链表，添加到父亲的副作用链表的尾部，回遡到父节点
 * 
 * 3.next = 4
 * lastEffect = 5
 * 5.next = B
 */
function makeEffectList(completeWork) {
  let returnFiber = completeWork.return;
  if (returnFiber) {
    // 父fiber没有副作用链表，则父亲和当前的fiber的副作用链表同步
    if (!returnFiber.firstEffect) {
      returnFiber.firstEffect = completeWork.firstEffect;
    }
    // 如果当前fiber和父fiber都有副作用链表，则要把当前fiber的副作用链表追加到父fiber的副作用链表
    // 移动firstEffect 和 lastEffect指针
    if (completeWork.lastEffect) {
      if (returnFiber.lastEffect) {
        returnFiber.lastEffect.nextEffect = completeWork.firstEffect;
      }
      returnFiber.lastEffect = completeWork.lastEffect;
    }
    // 当前fiber有副作用操作
    // 最后把当前fiber追加到副作用链表尾部
    // 移动lastEffect指针
    if (completeWork.flags) {
      if (returnFiber.lastEffect) {
        returnFiber.lastEffect.nextEffect = completeWork;
      } else {
        returnFiber.firstEffect = completeWork;
      }
      returnFiber.lastEffect = completeWork;
    }
  }
}

/** 创建dom元素 并返回 */
function createStateNode(fiber) {
  if (fiber.tag === TAG_HOST) {
    let stateNode = document.createElement(fiber.type);
    debugger
    stateNode.setAttribute('style', fiber.props.style);
    fiber.stateNode = stateNode;
  }
  return fiber.stateNode;
}

/**
 * 根据当前的fiber和虚拟dom创建fiber链表树
 * @param {} workInProgress 
 */
function beginWork(workInProgress) {
  console.log('beginWork', workInProgress.key);
  let nextChildren = workInProgress.props.children;
  // 会根据父fiber根据所有虚拟dom的儿子构建虚拟dom树
  return reconcileChildren(workInProgress, nextChildren);
}

/**
 * 根据父fiber，子虚拟dom树，构建当前子fiber的fiber树
 * @param {*} workInProgress // 父fiber
 * @param {*} nextChildren // jsx里的虚拟dom
 */
function reconcileChildren(returnFiber, nextChildren) {
  let previeusFiber; // 上一newfiber儿子
  let firstChildFiber; // 第一个儿子fiber, 大儿子

  for (let i = 0; i < nextChildren.length; i++) {
    let newFiber = createFiber(returnFiber, nextChildren[i]);
    newFiber.flags = Placement;
    newFiber.return = returnFiber;
    // 当前newFiber是大儿子
    if (!firstChildFiber) {
      firstChildFiber = newFiber;
    } else {
      previeusFiber.sibling = newFiber;
    }
    previeusFiber = newFiber;
  }
  returnFiber.child = firstChildFiber;

  return firstChildFiber; // 构建完fiber后，返回大儿子
}

/**
 * 把虚拟dom 构造成fiber结构
 * @param {} returnFiber 
 * @param {*} element 
 * @returns 
 */
function createFiber(returnFiber, element) {
  return {
    tag: TAG_HOST, // 原生dom标签
    type: element.type, // 标签类型
    key: element.key, // 唯一标示
    props: element.props, // props
    return: returnFiber, //  父fiber
  }
}
