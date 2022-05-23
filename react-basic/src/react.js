
import  { REACT_ELEMENT } from './constants';
import { toVDom } from './utils';
import { Component } from './Component';

/**
 * 创建虚拟dom
 * @param {*} type 元素类型
 * @param {*} config style children
 * @param {*} children 如果两个儿子就是数组，如果没有元素就是字符串
 * @returns 
 */
function createElement(
  type,
  config,
  children
) {
  delete config.__self;
  delete config.__source;

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
    key: props.key,
    type,
    props,
  }
}


const React = {
  createElement,
  Component,
}

export default React;