import { REACT_COMPONENT } from './constants';
import { findDom, compareTwoVDom } from './react-dom';

// 全局变量
export let updateQueue = {
  isBatchingUpdate: false,
  updaters: new Set(),
  batchUpdate() { // 批量更新
    updateQueue.isBatchingUpdate = false;
    for(var updater of updateQueue.updaters) {
      updater.updateComponent();
    }
    updateQueue.updaters.clear();
  }
}

class Updater {
  constructor(classInstance) {
    this.classInstance = classInstance;
    this.pendingStates = [];
  }

  addState(partialState) {
    this.pendingStates.push(partialState);
    this.emitUpdate();
  }

  emitUpdate(nextProps) {
    this.nextProps = nextProps;
    if (updateQueue.isBatchingUpdate) {
      updateQueue.updaters.add(this);
    } else {
      this.updateComponent();
    }
  }

  updateComponent() {
    const { pendingStates, classInstance } = this;
    if (this.nextProps || pendingStates.length > 0) {
      shouldUpdate(classInstance, this.nextProps, this.getState())
    }
  }

  getState() {
    const { pendingStates, classInstance } = this;
    let { state } = classInstance;
    pendingStates.forEach((nextState) => {
      if (typeof nextState === 'function') {
        nextState = nextState(state);
      }
      state = { ...state, ...nextState };
    })
    pendingStates.length = 0;
    return state;
  }
}

function shouldUpdate(classInstance, nextProps, nextState) {
  let willUpdate = true;
  if (classInstance.shouldComponentUpdate && !classInstance.shouldComponentUpdate(nextProps, nextState)) {
    willUpdate = false;
  }

  if (willUpdate && classInstance.componentWillUpdate) {
    classInstance.componentWillUpdate();
  }

  // 无论shouldUpdate是true还是false 都要更新state 更新props
  if (nextProps) {
    classInstance.props = nextProps;
  }
  if (nextState) {
    classInstance.state = nextState;
  }
  if (willUpdate) {
    classInstance.forceUpdate();
  }
}

export class Component {
  static isReactComponent = REACT_COMPONENT
  constructor(props) {
    this.props = props;
    this.state = {};
    // 每个类组件实例都有自己的Updater更新器
    this.updater = new Updater(this);
  }

  setState(newState) {
    this.updater.addState(newState);
  }

  forceUpdate() {
    let oldVDom = this.oldRenderVDom;
    let oldDom = findDom(oldVDom);
    if (this.constructor.contextType) {
      this.context = this.constructor.contextType._currentValue;
    }
    if (this.constructor.getDerivedStateFromProps) {
      // 根据最新的props和上一个state获取最新的state
      // 因为fiber的引入，导致will开头的钩子会多次渲染，所以去除willumount钩子，其他带will的钩子都废除
      let newState = this.constructor.getDerivedStateFromProps(this.props, this.state);
      if (newState) {
        this.state = { ...this.state, ...newState };
      }
    }
    // 暂存这一帧的shot对象
    let snapshot = this.getSnapshotBeforeUpdate && this.getSnapshotBeforeUpdate();
    let newVDom = this.render();
    compareTwoVDom(oldDom.parentNode, newVDom, oldVDom);
    this.oldRenderVDom = newVDom;
    if (this.componentDidUpdate) {
      this.componentDidUpdate(this.props, this.state, snapshot);
    }
  }
}


