import _ from 'lodash';
import {Component, batchUpdate} from './ReactBaseComponent';
import { NoMode, ConcurrentMode } from './ReactTypeMode'; 
import { HostRoot, ClassComponent, HostComponent} from './ReactWorkTags';
import React from 'react';
import ReactDOM from 'react-dom';

class Counter extends Component {
  state = {number: 0}
  /**
   * @param {*} event 
   */
  handleClick = (event) => {
    debugger
    // this.setState((prevState) => ({number: prevState.number + 1}));
    // console.log('setState1', this.state); // 0
    // this.setState((prevState) => ({number: prevState.number + 1}));
    // console.log('setState2', this.state); // 0
    // setTimeout(() => {
    //   this.setState((prevState) => ({number: prevState.number + 1}));
    //   console.log('setTimeout setState1', this.state); // 2
    //   this.setState((prevState) => ({number: prevState.number + 1}));
    //   console.log('setTimeout setState2', this.state); // 2
    // })
    this.setState({number: this.state.number + 1}); // 0
    console.log('setState1', this.state);
    this.setState({number: this.state.number + 1}); // 0
    console.log('setState2', this.state);
    setTimeout(() => {
      this.setState({number: this.state.number + 1});
      console.log('setTimeout setState1', this.state); // 1 // react16此处为同步， 2
      this.setState({number: this.state.number + 1});
      console.log('setTimeout setState2', this.state); // 1 // react16此处为同步， 3
    })
    // 最后是2

    // this.setState({number: this.state.number + 1}); // 0
    // console.log('setState1', this.state);
    // this.setState({number: this.state.number + 1}); // 0
    // console.log('setState2', this.state);
    // setTimeout(() => {
    //   batchUpdate( () => {
    //     this.setState({number: this.state.number + 1});
    //     console.log('setTimeout setState1', this.state); // 1 // react16此处为同步， 2
    //     this.setState({number: this.state.number + 1});
    //     console.log('setTimeout setState2', this.state); // 1 // react16此处为同步， 3
    //   })
    // })
  }

  render() {
    return (
      <div>
        <p>{this.state.number}</p>
        <button onClick={this.handleClick}>+</button>
      </div>
    )
  }
}

/** 实现setState */
let counterInstance = new Counter();
let mode = ConcurrentMode; // 同步模式

// 每个fiber下的updateQueue是链表，为简单，此处改为数组
let rootFiber = {tag: HostRoot, updateQueue: [], mode};
let conterFiber = {tag: ClassComponent, updateQueue: [], mode};

// 双向指针
// fiber 的 stateNode指向类的实例
conterFiber.stateNode = counterInstance;
// 类实例的_reactInternal 指向组件实例对象的fiber
counterInstance._reactInternal = conterFiber;

// rootFiber的第一个儿子，大二时是counterFiber
rootFiber.child = conterFiber;
conterFiber.return = rootFiber;

//合成事件 17以后 放在容器里
document.addEventListener('click', function(event) {
  let syntheticEvent = {nativeEvent: event}; // 根据原生事件创建合成事件
  batchUpdate(() => conterFiber.handeClick(syntheticEvent));
})

ReactDOM.render(
  <Counter></Counter>,
  document.getElementById('root')
);
/**
 * 并发模式下，setState会合并，不管在哪里都会合并, 通过更新优先级合并 // 开发版
 * 同步模式， 如果用batchUpdate，就会批量更新，如果不用就是同步更新 //稳定版
 * 为什么在事件函数或生命周期函数中是批量的，是用batchUpdate
 */