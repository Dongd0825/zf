import React, { Suspense, useEffect, useState } from 'react';
import ReactDom from 'react-dom';
import { HashRouter,Routes, Route, Link} from 'react-router-dom';
// prefetch 如果浏览器空闲，可以自动加载
const Home = dynamic(() => import(/* webpackPrefetch: true*/'./home'));
const User = dynamic(() => import(/* webpackPrefetch: true*/'./user'));

function dynamic(loadComponent) {
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


ReactDom.render(
  <HashRouter>
    <ul>
      <li>
        <Link to="/">Home</Link>
      </li>
      <li>
        <Link to="/user">user</Link>
      </li>
    </ul>
    <Routes>
      <Route path="/" element={Home}></Route>
      <Route path="/user" element={User}></Route>
    </Routes>
  </HashRouter>
, document.getElementById('root'))