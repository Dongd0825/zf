import { REACT_COMPONENT, REACT_TEXT, REACT_FORWARD_REF_TYPE, REACT_FRAGMENT, REACT_PROVIDER, REACT_CONTEXT, REACT_MEMO } from "./constants";
import { addEvent } from './event';

const PLACEMENT = 'PLACEMENT';
const MOVE = 'MOVE';

function render(vDom, container) {
  mount(vDom, container);
}

function mount(vDom, container) {
  let newDom = createDom(vDom);
  if (!newDom) return;
  container.appendChild(newDom);
}

function createDom(vDom) {
  const { type, props, ref } = vDom;
  let dom;
  if (type && type.$$typeof === REACT_MEMO) {
    return mountMemoComponent(vDom)
  } else if (type && type.$$typeof === REACT_PROVIDER) {
    return mountProviderComponent(vDom)
  } else if (type && type.$$typeof === REACT_CONTEXT) {
    return mountContextComponent(vDom)
  } else if (type === REACT_FRAGMENT) {
    dom = document.createDocumentFragment();
  } else if (type && type.$$typeof === REACT_FORWARD_REF_TYPE) {
    return mountForwardComponent(vDom);
  } else if (type === REACT_TEXT) {
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

function mountMemoComponent(vDom) {
  let { type, props } = vDom;
  let renderVdom = type.type(props);
  if (!renderVdom) return null;
  vDom.oldRenderVDom = renderVdom;
  return createDom(renderVdom);
}

function mountProviderComponent(vDom) {
  let { type, props } = vDom;
  let context = type._context;
  context._currentValue = props.value;
  let renderVdom = props.children;
  if (!renderVdom) return null;
  vDom.oldRenderVDom = renderVdom;
  return createDom(renderVdom);
}

function mountContextComponent(vDom) {
  let { type, props } = vDom;
  let context = type._context;
  let renderVdom = props.children(context._currentValue);
  if (!renderVdom) return null;
  vDom.oldRenderVDom = renderVdom;
  return createDom(renderVdom);
}

function mountForwardComponent(vDom) {
  const { type, props, ref } = vDom;
  let renderVdom = type.render(props, ref);
  if (!renderVdom) return null;
  vDom.oldRenderVDom = renderVdom;
  return createDom(renderVdom);
}

function renderClassComponent(vDom) {
  const { type, props, ref } = vDom;
  const instance = new type(props);
  vDom.classInstance = instance;
  if (type.contextType) {
    instance.context = type.contextType._currentValue;
  }
  if (ref) {
    ref.current = instance;
  }
  if (instance.componentWillMount) {
    instance.componentWillMount();
  } 
  const renderDom = instance.render();
  if (!renderDom) return null;
  instance.oldRenderVDom = renderDom;
  let dom = createDom(renderDom);
  if (instance.componentDidMount) {
    instance.componentDidMount();
  }
  
  return dom;
}

function renderFunctionComponent(vDom) {
  const { type, props } = vDom;
  const renderDom = type(props);
  if (!renderDom) return null;
  vDom.oldRenderVDom = renderDom;
  return createDom(renderDom);
}

function reconcileChildren(childVDom, dom) {
  for (let i = 0; i < childVDom.length; i++) {
    childVDom[i].mountIndex = i;
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
    //新老都有，但类型不同  p -> div
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
  if (oldVDom.type.$$typeof === REACT_MEMO) {
    updateMemoComponent(oldVDom, newVDom);
  } else if (oldVDom.type.$$typeof === REACT_CONTEXT) {
    updateContextComponent(oldVDom, newVDom);
  } else if (oldVDom.type.$$typeof === REACT_PROVIDER) {
    updateProviderComponent(oldVDom, newVDom);
  } else if (oldVDom.type === REACT_TEXT) { // text文本节点
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
  } else if (typeof oldVDom.type === 'function') {
    if (oldVDom.type.isReactComponent) {
      updateClassComponent(oldVDom, newVDom);
    } else {
      updateFunctionComponent(oldVDom, newVDom);
    }
  }
} 

function updateMemoComponent(oldVdom, newVdom) {
  let { type } = oldVdom;
  if (!type.compare(oldVdom.props, newVdom.props)) {
    let parentDOM = findDom(oldVdom).parentNode;
    let { type, props } = newVdom;
    let renderVdom = type.type(props);
    compareTwoVDom(parentDOM, renderVdom, oldVdom.oldRenderVDom);
    newVdom.props = props;
    newVdom.oldRenderVDom = renderVdom;
  } else {
    newVdom.props = oldVdom.props;
    newVdom.oldRenderVDom = oldVdom.oldRenderVDom;
  }
}

function updateProviderComponent(oldVdom, newVdom) {
  let parentDOM = findDom(oldVdom).parentNode;
  let { type, props } = newVdom;
  let context = type._context;
  context._currentValue = props.value;
  let renderVdom = props.children;
  compareTwoVDom(parentDOM, renderVdom, oldVdom.oldRenderVDom);
  newVdom.oldRenderVDom = renderVdom;
}

function updateContextComponent(oldVdom, newVdom) {
  let parentDOM = findDom(oldVdom).parentNode;
  let { type, props } = newVdom;
  let context = type._context;
  let renderVdom = props.children(context._currentValue);
  compareTwoVDom(parentDOM, renderVdom, oldVdom.oldRenderVDom);
  newVdom.oldRenderVDom = renderVdom;
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
  let currentDOM = findDom(oldVDom);
  if (!currentDOM) return;
  let parentDom = currentDOM.parentNode;
  let { type, props } = newVDom;
  let newRenderVdom = type(props);
  compareTwoVDom(parentDom, newRenderVdom, oldVDom.oldRenderVDom);
  newVDom.oldRenderVDom = newRenderVdom;
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

function updateChildren(parentDom, oldVDomChildren, newVDomChildren){
  oldVDomChildren = Array.isArray(oldVDomChildren) ? oldVDomChildren : oldVDomChildren ? [oldVDomChildren].filter(Boolean) : [];
  newVDomChildren = Array.isArray(newVDomChildren) ? newVDomChildren : newVDomChildren ? [newVDomChildren].filter(Boolean) : [];
  let keyOldMap = {};
  let lastPlacedIndex = 0;
  let patch = [];
  oldVDomChildren.forEach((oldVChild, index) => {
    let key = oldVChild.key ? oldVChild.key : index;
    keyOldMap[key] = oldVChild;
  });
  newVDomChildren.forEach((newVChild, index) => {
    newVChild.mountIndex = index;
    let key = newVChild.key ? newVChild.key : index;
    let oldVChild = keyOldMap[key];
    if (oldVChild) {
      updateElement(newVChild, oldVChild);
      // 找到老节点 并且在最新节点下标的左边
      if (oldVChild.mountIndex < lastPlacedIndex) {
        patch.push({
          type: MOVE,
          newVChild,
          oldVChild,
          mountIndex: index
        });
      }
      delete keyOldMap[key];
      // 记录匹配的老节点下标
      lastPlacedIndex = Math.max(lastPlacedIndex, oldVChild.mountIndex);
    } else {
      patch.push({
        type: PLACEMENT,
        newVChild,
        mountIndex: index
      });
    }
  })
  let moveChildren = patch.filter((action) => action.type === MOVE).map(action => action.oldVChild);
  // 把剩下的节点和需要移动的节点删除
  Object.values(keyOldMap).concat(moveChildren).forEach(oldVChild => {
    let currentDOM = findDom(oldVChild);
    parentDom.removeChild(currentDOM);
  });
  patch.forEach(action => {
    let { type, oldVChild, newVChild, mountIndex } = action;
    let childNodes = parentDom.childNodes;
    // 新增节点
    if (type === PLACEMENT) {
      let newDom = createDom(newVChild);
      let childNode = childNodes[mountIndex];
      if (childNode) {
        childNodes.insertBefore(newDom, childNode);
      } else {
        parentDom.appendChild(newDom);
      }
    } else if (type === MOVE) {
      let oldDom = findDom(oldVChild);
      let childNode = childNodes[mountIndex];
      if (childNode) {
        childNodes.insertBefore(oldDom, childNode);
      } else {
        parentDom.appendChild(oldDom);
      }
    }
  })

}

const ReactDom = {
  render,
  createPortal: render
}

export default ReactDom;