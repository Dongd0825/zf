import { updateQueue } from './Component';

export function addEvent(dom, eventType, handler) {
  let store = dom.store || (dom.store = {});
  // 不是原生的事件函数，自定义函数怎么处理？
  store[eventType] = handler;
  if (!document[eventType]) {
    document[eventType] = dispatchEvent;
  }
}

/**
 * 合成事件
 * 1.屏蔽浏览器的差异
 * 2.批量更新  控制合适触发批量更新
 * updateQueue.isBatchingUpdate = true;
 * @param {*} event  真实事件
 */
function dispatchEvent(event) {
  let { target, type } = event;
  let eventType = `on${type}`;
  updateQueue.isBatchingUpdate = true;
  const syntheticEvent = createSyntheticEvent(event);

  // currentTarget 当前dom节点
  let currentTarget = target;
  while (currentTarget) { //递归寻找父节点
    syntheticEvent.currentTarget = currentTarget;
    let { store } = currentTarget;
    let handler = store && store[eventType];
    if (syntheticEvent.isPropagationStopped) {
      break;
    }
    handler && handler(syntheticEvent);
    currentTarget = currentTarget.parentNode;
  }
  updateQueue.batchUpdate();
}

function createSyntheticEvent(nativeEvent) {
  let syntheticEvent = {};
  for (let key in nativeEvent) {
    let value = nativeEvent[key];
    if (typeof value === 'function') {
      value = value.bind(nativeEvent);
    }
    syntheticEvent[key] = value;
  }
  syntheticEvent.nativeEvent = nativeEvent;
  syntheticEvent.isDefaultPrevented = false;
  syntheticEvent.isPropagationStopped = false;
  syntheticEvent.preventDefault = preventDefault;
  syntheticEvent.stopPropagation = stopPropagation;
  return syntheticEvent;
}

function preventDefault() {
  this.defaultPrevented = true;
  const event = this.nativeEvent;
  if (event.preventDefault) {
    event.preventDefault();
  } else {
    event.returnValue = false;
  }
  this.isDefaultPrevented = true;
}

function stopPropagation() {
  // this.defaultPrevented = true;
  const event = this.nativeEvent;
  if (event.stopPropagation) {
    event.stopPropagation();
  } else {
    event.cancelBubble = true;
  }
  this.isPropagationStopped = true;
}