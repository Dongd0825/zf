import React, { Suspense, useEffect, useState } from 'react';
import  { Map, is } from 'immutable';

/**
 * 浅比较对象 性能比较高
 * 如果两个对象是同一个地址引用则相等
 * 如果两个对象的key个数不同则不等
 * 两个对象的key都相同则相等 否则不等
 * @param {*} obj1 
 * @param {*} obj2 
 */
function shallowEqual1(obj1, obj2) {
  if (obj1 === obj2) {
    return true;
  }
  let key1s = Object.keys(obj1);
  let key2s = Object.keys(obj2);
  if (key1s.length !== key2s.length) {
    return false;
  }
  for (let key of key1s) {
    if (!obj2.hasOwnProperty(key) || obj1[key] !== obj2[key]) {
      return false;
    }
  }
  return true;
}

function shallowEqual(obj1, obj2) {
  if (obj1 === obj2) {
    return true;
  }
  let key1s = Object.keys(obj1);
  let key2s = Object.keys(obj2);
  if (key1s.length !== key2s.length) {
    return false;
  }
  for (let key of key1s) {
    if (!obj2.hasOwnProperty(key) || !is(obj1[key], obj2[key])) {
      return false;
    }
  }
  return true;
}

export class PureComponent extends React.Component {
  shouldComponentUpdate(nextProps, nextState) {
    return !shallowEqual(this.props, nextProps) || !shallowEqual(this.state, nextState);
  }
}

export function memo(FunctionComponent) {
  return class extends PureComponent {
    render() {
      return <FunctionComponent {...this.props}></FunctionComponent>
    }
  }
}


export function dynamic(loadComponent) {
  // const _component = React.lazy(component);
  const Component = Lazy(loadComponent);
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Component></Component>
    </Suspense>
  )
}

// TODO
// function lazy(loadComponent) {
//   const [component, setComponent] = useState(null);

//   useEffect(() => {
//     loadComponent().then(component => {
//       setComponent(component.default);
//     })
//   }, [])

//   return component && <component></component>
// }

function Lazy (loadComponent) {
  return class Lazy extends React.Component {
    state = {Component:null};
    componentDidMount() {
      loadComponent().then(result => {
        this.setState({
          Component: result.default
        })
      })
    }
    render() {
      const { Component } = this.state;
      return Component && <Component></Component>
    }
  } 
}


/**
 * map不可变数据
 * 
 */

// useCallback可回调
 function useCallbackState(initData) {
  const ref = useRef();
  const [data, setData] = useState(initData);

  useEffect(() => {
    ref.current && ref.current(data);
  }, [data])


  return [data, function(_data, callback) {
    ref.current = callback;
    setData(_data);
  }]
}
// TODO useMemoState