import { REACT_COMPONENT } from './constants';
import { findDom, compareTwoVDom } from './react-dom';
class Updater {
  constructor(classInstance) {
    this.classInstance = classInstance;
    this.pendingStates = [];
  }

  addState(partialState) {
    this.pendingStates.push(partialState);
    this.emitUpdate();
  }

  emitUpdate() {
    this.updateComponent();
  }

  updateComponent() {
    const { pendingStates, classInstance } = this;
    if (pendingStates.length > 0) {
      shouldUpdate(classInstance, this.getState())
    }
  }

  getState() {
    const { pendingStates, classInstance } = this;
    let { state } = classInstance;
    pendingStates.forEach((nextState) => {
      if (typeof nextState === 'function') {
        nextState = nextState(state);
      }
      state = { ...state, ...nextState}
    })
    pendingStates.length = 0;
    return state;
  }
}

function shouldUpdate(classInstance, nextState) {
  classInstance.state = nextState;
  classInstance.forceUpdate();
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
    let newVDom = this.render();
    compareTwoVDom(oldDom.parentNode, newVDom, oldVDom);
    this.oldRenderVDom = newVDom;
  }
}


