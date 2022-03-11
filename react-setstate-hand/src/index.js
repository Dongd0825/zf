import _ from 'lodash';
import React from 'react';
import ReactDOM from 'react-dom';
import { SyncLane } from 'react-reconciler/src/ReactFiberLane.old';
import Counter from './Counter';
import { NoMode } from './ReactTypeMode'; 
import { HostRoot, ClassComponent, HostComponent} from './ReactWorkTags';
import scheduleUpdateOnFiber from './scheduleUpdateOnFiber';


// ReactDOM.render(
//   <Counter></Counter>,
//   document.getElementById('root')
// );

/** 实现setState */
let counterInstance = new Counter();
let mode = NoMode; // 同步模式

// 每个fiber下的updateQueue是链表，为简单，此处改为数组
let rootFiber = {tag: HostRoot, updateQueue: [], mode};
let conterFiber = {tag: ClassComponent, updateQueue: [], mode};

// 双向指针
// fiber 的 stateNode指向类的实例
conterFiber.stateNode = counterInstance;
// 类实例的_reactInternal 指向组件实例对象的fiber
counterInstance._reactInternal = conterFiber;

// rootFiber的第一个儿子，大二时是counterFiber
rootFiber.child = concurrentFiber;
concurrentFiber.return = conterFiber;


class classComponentUpdater {
  /**
   * 
   * @param {zuj} publicInstance  组件实例
   * @param {*} payload  新状态
   */
  
  enqueueSetState(publicInstance, payload) {
    /**
     * 获取程序当前的执行时间，为计算任务的过期时间
     * 任务有不同优先级，优限级高的会打断优先级低的
     * 如果低优先级的任务一直不被执行，是否过期，如果过期，也要立即执行
     */
     var fiber = get(inst);
    var eventTime = requestEventTime();
    /**
     *  启用一个更新的赛道，计算本次更新的优先级
     * lane 赛道的意思 越往外优先级约低，约往内优先级约高
     * 1 优先级最高
     */
    var lane = requestUpdateLane(fiber);
    //  创建一个更新对象
    var update = createUpdate(eventTime, lane);
    // 负载数据 {number:1}
    update.payload = payload;

    // if (callback !== undefined && callback !== null) {
    //   {
    //     warnOnInvalidCallback(callback, 'setState');
    //   }

    //   update.callback = callback;
    // }

    enqueueUpdate(fiber, update);
    scheduleUpdateOnFiber(fiber, lane, eventTime);
  }
}

// 此处写死 最高优先级1
function requestUpdateLane() {
  return SyncLane;
}
// 离散事件 点击 用户阻塞，drag，连续事件 error compelte
// 影响优先级
// 优先级不一样，赛道不一样

// TODO
/**
 * 返回一个对象
 * @param {*} eventTime 计算超时时间
 * @param {*} lane 计算任务优先级 赛道越小，优先级约高
 */
function createUpdate(eventTime, lane) {
  return {

  }
}

/**
 * 
 * @param {*} fiber 
 * @param {*} update 
 */
function enqueueUpdate(fiber, update) {
  // 源码是是环形链表
  fiber.update.push(update);
}


/**
 * 返回实例对应的fiber
 * @param {*} inst 
 * @returns 
 */
function get(inst) {
  return inst._reactInternal;
}

class Component {
  constructor() {
    this.updater = classComponentUpdater;
  }

  setState(partialState, callback) {
    // 调用此组件更新器的enqueueSetState入队新状态方法，参数 组件的实例和新状态
    this.updater.enqueueSetState(this, partialState);
  }
}
