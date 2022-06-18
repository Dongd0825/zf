
import  { REACT_ELEMENT, REACT_FORWARD_REF_TYPE, REACT_PROVIDER, REACT_CONTEXT, REACT_MEMO } from './constants';
import { toVDom, shallowEqual } from './utils';
import { Component } from './Component';
import * as hooks from './react-dom';

export * from './react-dom';

/**
 * 创建虚拟dom
 * @param {*} type 元素类型 class function
 * @param {*} config style children
 * @param {*} children 如果两个儿子就是数组，如果没有元素就是字符串
 * @returns 
 */
function createElement(
  type,
  config,
  children
) {
  let ref;
  let key;
  if (config) {
    delete config.__source;
    delete config.__self;
    ref = config.ref;
    delete config.ref;
    key = config.key;
    delete config.key;
  }

  let props = {
    ...config
  }

  if (arguments.length > 3) {
    props.children = Array.prototype.slice.call(arguments, 2).map(toVDom);
  } else {
    props.children = toVDom(children);
  }

  return {
    $$typeof: REACT_ELEMENT,
    ref,
    key,
    type,
    props,
  }
}

function createRef () {
  return { current: null }
}

function forwardRef (render) {
  return {
    $$typeof: REACT_FORWARD_REF_TYPE,
    render
  }
}

function createContext() {
  let context = { _currentValue: undefined };
  context.Provider = {
    $$typeof: REACT_PROVIDER,
    _context: context
  }
  context.Consumer = {
    $$typeof: REACT_CONTEXT,
    _context: context
  }
  return context;
}

function cloneElement(element, newProps, ...newChildren) {
  let children = element.props && element.props.children;
  if (newChildren.length > 0) {
    children = newChildren.map(toVDom);
  }

  if (children.length === 1) {
    children = children[0]
  };
  let props = { ...element.props, ...newProps, children}
  return { ...element, props };
}

class PureComponent extends Component {
  constructor(props) {
    super(props);
  }
  shouldComponentUpdate(newProps, nextState) {
    return !shallowEqual(this.props, newProps) || !shallowEqual(this.state, nextState);
  }
} 

function memo(type, compare = shallowEqual) {
  return {
    $$typeof: REACT_MEMO,
    type,
    compare,
  }
}



const React = {
  createElement,
  Component,
  createRef,
  forwardRef,
  createContext,
  cloneElement,
  PureComponent,
  memo,
  ...hooks,
}


export default React;