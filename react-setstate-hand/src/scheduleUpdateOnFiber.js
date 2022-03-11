import { SyncLane } from './ReactFiberLane';
import { ClassComponent } from './ReactWorkTags';
let syncLanePriority = 12;
let NoLanePriority = 0;

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
}

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
  // 标记优先级低（低赛道），快过期的任务 
  // markStarvedLanesAsExpired(root, currentTime); // Determine the next lanes to work on, and their priority.
 
  // 获取最高优先级的lane 1 //fiber里
  var nextLanes = SyncLane;
  // 获取最高级别的赛道的优先级 12
  let existingCallbackPrority = root.callbackPriority; // 第一次undefined
  let newCallbackPropority = syncLanePriority; //按理说应该等于最高级别赛道的优先级
  if (newCallbackPropority === existingCallbackPrority) {
    // 也是在开发模式，即使在settimeout里也是批量的原因
    return ;// 如果新的更新和当前根节点的更新相等，直接返回，复用上次的更新，则不需要创建新的更新
  }
  sceduleSyncCallback(performSyncWorkOnRoot.bind(null, root));
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

function commitRoot(root) {
  root.callbackPriority = NoLanePriority;
}

/**
 * 根据老状态和更细队列，计算新状态
 * @param {*} inst 
 * @param {*} workInProgress 
 */
function processUpdateQueue(inst, fiber) {
  return fiber.update.reduce((state, update) => {
    if (typeof update.payload === 'function') {
      payload = update.payload;
    }
    return {
      ...state, 
      ...payload
    }
  }, inst.state);
}

export default scheduleUpdateOnFiber;