import { REACT_COMPONENT, REACT_TEXT } from "./constants";
import { addEvent } from './event';

// TODO key

function render(vDom, container) {
  mount(vDom, container);
}

function mount(vDom, container) {
  let newDom = createDom(vDom);
  container.appendChild(newDom);
}

function createDom(vDom) {
  const { type, props, ref } = vDom;
  let dom;
  if (type === REACT_TEXT) {
    dom = document.createTextNode(props);
  } else if (typeof type === 'function') {
    if (type.isReactComponent === REACT_COMPONENT) {
      return renderClassComponent(vDom);
    } else {
      return renderFunctionComponent(vDom);
    }
  } else {
    dom = document.createElement(type);
  }
  if (props) {
    updateProps(dom, {}, props);
    if (typeof props.children === 'object' && props.children.type) {
      mount(props.children, dom);
    } else if (Array.isArray(props.children)) {
      reconcileChildren(props.children, dom);
    }
  }
  if (ref) {
    ref.current = dom;
  }
  
  vDom.dom = dom;
  return dom;
}

function renderClassComponent(vDom) {
  const { type, props, ref } = vDom;
  const instance = new type(props);
  vDom.classInstance = instance;
  if (ref) {
    ref.current = instance;
  }
  const renderDom = instance.render();
  instance.oldRenderVDom = renderDom;
  
  return createDom(renderDom);
}

function renderFunctionComponent(vDom) {
  const { type, props } = vDom;
  const renderDom = type(props);
  vDom.oldRenderVDom = renderDom;
  return createDom(renderDom);
}

function reconcileChildren(childVDom, dom) {
  for (let i = 0; i < childVDom.length; i++) {
    mount(childVDom[i], dom);
  }
}

function updateProps(dom, oldProps = {}, newProps = {}) {
  for (let key in newProps) {
    if (key === 'children') {
      continue;
    } else if (key === 'style') {
      let styleObj = newProps[key];
      for (let attr in styleObj) {
        dom.style[attr] = styleObj[attr];
      }
    } else if (/^on[A-Z].*/.test(key)) { //startsWith('on')
      // 走addEvent代理，代理到document
      addEvent(dom, key.toLowerCase(), newProps[key]);
      // dom[key.toLowerCase()] = newProps[key];
    } else {
       dom[key] = newProps[key];
    }
  }
  for (let key in oldProps) {
    if (!newProps.hasOwnProperty(key)) {
      dom[key] = null;
    }
  }
}

export function compareTwoVDom(parentNode, newVDom, oldVDom) {
  let newDom = createDom(newVDom);
  let oldDom = findDom(oldVDom);
  parentNode.replaceChild(newDom, oldDom);
}

export function findDom(vDom) {
  if (!vDom) {
    return
  }
  // 原生类型
  if (vDom.dom) {
    return vDom.dom;
  } else { // class function类型
    let oldVDom = vDom.classInstance ? vDom.classInstance.oldRenderVDom :  vDom.oldRenderVDom;
    return findDom(oldVDom);
  }
}

const ReactDom = {
  render,
}

export default ReactDom;