
import  { REACT_ELEMENT, REACT_FORWARD_REF_TYPE } from './constants';
import { toVDom } from './utils';
import { Component } from './Component';

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


const React = {
  createElement,
  Component,
  createRef,
  forwardRef
}

export default React;