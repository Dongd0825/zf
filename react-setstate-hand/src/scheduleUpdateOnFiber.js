import { SyncLane } from './ReactFiberLane';
import { ConcurrentMode, NoMode } from './ReactTypeMode';
import { HostRoot, ClassComponent } from './ReactWorkTags';

let syncLanePriority = 12;
let NoLanePriority = 0;
let syncQueue = [];
let NoContext = 0;// 默认非批量
let BatchContext = 1; // 批量
let executionContext = NoContext; // 执行环境，默认是NoConetxt
/**
 * 在fiber调度更新
 * @param {z} fiber 
 * @param {*} lane 
 * @param {*} eventTime 
 */
function scheduleUpdateOnFiber(fiber, lane, eventTime) {
  //checkForNestedUpdates();
  //warnAboutRenderPhaseUpdatesInDEV(fiber);
  // 向上找到跟节点 root
  var root = markUpdateLaneFromFiberToRoot(fiber, lane);
  ensureRootIsScheduled(root, eventTime);
  // 如果当前的执行上下文环境是NoContext（非批量）并且Mode不是并发的话
  if (executionContext === NoContext && (fiber.mode & ConcurrentMode) === NoMode) {
    flushSyncCallbackQueue();
  }
}


// 从当前fiber节点，递归找到root
function markUpdateLaneFromFiberToRoot(fiber) {
  let parent = fiber.return;
  while(parent) {
    fiber = parent;
    parent = fiber.return;
    if (fiber.tag == HostRoot) {
      return parent;
    }
  }
  return null;
}

/**
 * 
 * @param {*} root 
 * @param {*} eventTime 
 */
function ensureRootIsScheduled(root, eventTime) {
  // 标记优先级低（低赛道），快过期的任务， 标记为更新
  // markStarvedLanesAsExpired(root, currentTime); // Determine the next lanes to work on, and their priority.
 
  // 获取最高优先级的lane 当前是 1 //fiber里
  var nextLanes = SyncLane;
  // 当前跟节点上，正在执行的优先级 // 第一次undefined
  let existingCallbackPrority = root.callbackPriority; 
  // 获取最高级别的赛道的优先级 12
  let newCallbackPropority = syncLanePriority; //按理说应该等于最高级别赛道的优先级
  // 赛道和优先级不一样， 有关系
  if (newCallbackPropority === existingCallbackPrority) {
    // 也是在并发模式，即使在settimeout里也是批量的原因
    return ;// 如果新的更新和当前根节点的更新相等，直接返回，复用上次的更新?，则不需要创建新的更新
    // TODO 复用上次的更新
  }
  sceduleSyncCallback(performSyncWorkOnRoot.bind(null, root));
  // 微任务执行
  queueMicrotask(flushSyncCallbackQueue);
  // 
  root.callbackPriority = newCallbackPropority;
}

// 时间放在微任务里
function queueMicrotask() {
  
}

function flushSyncCallbackQueue() {
  syncQueue.forEach(cb => cb());
  // 清空队列
  syncQueue.length = 0;
}


// 其实就是把函数放在队列里，等待执行 
// 调度
function sceduleSyncCallback(fn) {
  syncQueue.push(fn);
}

// 其实就是我们真正的渲染任务
// 包括dom-diff ，比较老节点和新节点，得到dom-diff结果
// 更新
// 都在这里
// 属于调和阶段  reconciler
function performSyncWorkOnRoot(workInProgress) {
  let root = workInProgress;
  while (workInProgress) {
    console.log('开始执行调和任务');
    // 类组件
    if(workInProgress.tag === ClassComponent) {
      let inst = workInProgress.stateNode; // 获取此处类组件的实例
      inst.state = processUpdateQueue(inst, workInProgress);
      // 得到新的state后，就可以render得到虚拟dom，之后domdiff，更新dom
      inst.render();
    }
    workInProgress = workInProgress.child;
  }
  commitRoot(root);
}

// 提交
function commitRoot(root) {
  // 根节点的优先级设置为默认值
  root.callbackPriority = NoLanePriority;
}

/**
 * 根据老状态和更细队列，计算新状态
 * @param {*} inst 
 * @param {*} workInProgress 
 */
function processUpdateQueue(inst, fiber) {
  return fiber.update.reduce((state, update) => {
    let payload = update.payload;
    if (typeof update.payload === 'function') {
      payload = update.payload(state);
    }
    return {
      ...state, 
      ...payload
    }
  }, inst.state);
}

// React.unstabe_batchUpdate
export function batchUpdate(fn) {
  let preContext = executionContext;
  executionContext |= BatchContext; 
  fn();
  executionContext = preContext;
}

export default scheduleUpdateOnFiber;