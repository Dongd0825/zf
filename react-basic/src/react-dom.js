import { REACT_COMPONENT, REACT_TEXT, REACT_FORWARD_REF_TYPE, REACT_FRAGMENT } from "./constants";
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
  if (type === REACT_FRAGMENT) {
    dom = document.createDocumentFragment();
  } else if (type && type.$$typeof === REACT_FORWARD_REF_TYPE) {
    return mountForwardComponent(vDom);
  } else if (type === REACT_TEXT) {
    // debugger
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

function mountForwardComponent(vDom) {
  const { type, props, ref } = vDom;
  let renderVdom = type.render(props, ref);
  vDom.oldRenderVdom = renderVdom;
  return createDom(renderVdom);
}

function renderClassComponent(vDom) {
  const { type, props, ref } = vDom;
  const instance = new type(props);
  vDom.classInstance = instance;
  if (ref) {
    ref.current = instance;
  }
  if (instance.componentWillMount) {
    instance.componentWillMount();
  } 
  const renderDom = instance.render();
  if (instance.componentDidMount) {
    instance.componentDidMount();
  }
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
      // TODO handle 回调如何处理？
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

export function compareTwoVDom(parentNode, newVDom, oldVDom, nextDom) {
  // let newDom = createDom(newVDom);
  // let oldDom = findDom(oldVDom);
  // parentNode.replaceChild(newDom, oldDom);
  if (!newVDom && !oldVDom) {
    return
  } else if (newVDom && !oldVDom) {
    // 新的有，老的没有
    let newDom = createDom(newVDom);
    if (nextDom) {
      nextDom.insertBefore(newDom, nextDom);
    } else {
      parentNode.appendChild(newDom);
    }
    if (newVDom.classInstance && newVDom.classInstance.componentDidMount) {
      newVDom.classInstance.componentDidMount();
    }
  } else if(!newVDom && oldVDom) {
    // 新的没有，老的有
    unMountDom(oldVDom);
  } else if (newVDom && oldVDom && oldVDom.type !== newVDom.type) {
    //新老都有，但类型不同 
    unMountDom(oldVDom);
    let newDom = createDom(newVDom);
    if (newDom.classInstance && newDom.classInstance.componentDidMount) {
      newDom.classInstance.componentDidMount();
    }
    if (nextDom) {
      nextDom.insertBefore(newDom, nextDom);
    } else {
      parentNode.appendChild(newDom);
    }
  } else {
    // 新老都有 类型相同
    updateElement(newVDom, oldVDom);
  }
} 

function unMountDom(vDom) {
  const { props, ref } = vDom;
  let currentDom = findDom(vDom);//获取此虚拟DOM对应的真实DOM
  if (ref) {
    ref.current = null;
  }
  // vdom可能是原生组件span 类组件 classComponent 也可能是函数组件Function
  if (vDom.classInstance && vDom.classInstance.componentWillUnmount) {
    vDom.classInstance.componentWillUnmount();
  }
  //如果此虚拟DOM有子节点的话，递归全部删除
  if (props.children) {
    let children = Array.isArray(props.children) ? props.children: [props.children];
    children.forEach(unMountDom);// TODO
  }
  //把自己这个虚拟DOM对应的真实DOM从界面删除
  currentDom.remove();
}

// 更新 复用dom，更新属性
function updateElement(newVDom, oldVDom) {
  if (oldVDom.type === REACT_TEXT) { // text文本节点
    let currentDOM = newVDom.dom = findDom(oldVDom); // 复用dom
    if (oldVDom.props !== newVDom.props) {
      currentDOM.textContent = newVDom.props;
    }
  } else if (typeof oldVDom.type === 'string') { // 原生节点
    let currentDOM = newVDom.dom = findDom(oldVDom); // 复用dom
    updateProps(currentDOM, oldVDom.props, newVDom.props);
    updateChildren(currentDOM, oldVDom.props.children, newVDom.props.children);
  } else if (oldVDom.type === REACT_FRAGMENT) {
    let currentDOM = newVDom.dom = findDom(oldVDom);
    updateChildren(currentDOM, oldVDom.props.children, newVDom.props.children);
  } else if (oldVDom.type === 'function') {
    if (oldVDom.type.isReactComponent) {
      updateClassComponent(oldVDom, newVDom);
    } else {
      updateFunctionComponent(oldVDom, newVDom);
    }
  }
} 

function updateClassComponent(oldVDom, newVDom) {
  let classInstance = newVDom.classInstance = oldVDom.classInstance;
  //如果findDOM不从classInstance上获取oldRenderVdom就需要在更新的时候也同步
  //newVdom.oldRenderVdom = newVdom.oldRenderVdom TODO??
  if (classInstance.componentWillReceiveProps) {
    classInstance.componentWillReceiveProps(newVDom.props);
  }
  classInstance.updater.emitUpdate(newVDom.props);
}

function updateFunctionComponent(oldVDom, newVDom) {
  let currentDOM = newVDom.dom = findDom(oldVDom);
  if (!currentDOM) return;
  let parentDom = currentDOM.parentNode;
  const { type, props } = newVDom;
  let newRenderVdom = type(props);
  compareTwoVDom(parentDom, newRenderVdom, oldVDom.oldRenderVdom);
  newVDom.oldRenderVdom = newRenderVdom;
}
function updateChildren(parentDOM, oldVChildren, newVChildren) {
   oldVChildren = Array.isArray(oldVChildren) ? oldVChildren : oldVChildren ? [oldVChildren].filter(Boolean) : []
   newVChildren = Array.isArray(newVChildren) ? newVChildren : newVChildren ? [newVChildren].filter(Boolean) : []
  let maxLen = Math.max(oldVChildren.length, newVChildren.length);
  for (let i = 0 ; i < maxLen; i++) {
    let nextVDom = oldVChildren.find((item, index) => index > i && item && findDom(item));
    compareTwoVDom(parentDOM, newVChildren[i], oldVChildren[i], nextVDom && findDom(nextVDom));
  }
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