import { REACT_COMPONENT, REACT_TEXT } from "./constants";
// TODO key

function render(vDom, container) {
  mount(vDom, container);
}

function mount(vDom, container) {
  let newDom = createDom(vDom);
  container.appendChild(newDom);
}

function createDom(vDom) {
  const { type, props } = vDom;
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
  return dom;
}

function renderClassComponent(vDom) {
  const { type, props } = vDom;
  const instance = new type(props);
  const renderDom = instance.render();
  return createDom(renderDom);
}

function renderFunctionComponent(vDom) {
  const { type, props } = vDom;
  const renderDom = type(props);
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

const ReactDom = {
  render
}

export default ReactDom;