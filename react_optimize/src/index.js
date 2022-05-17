import React, { Suspense, useEffect, useState } from 'react';
import ReactDom from 'react-dom';
import { HashRouter,Routes, Route, Link} from 'react-router-dom';
import { dynamic } from './utils';
// prefetch 如果浏览器空闲，可以自动加载
const Home = dynamic(() => import(/* webpackPrefetch: true*/'./home'));
const User = dynamic(() => import(/* webpackPrefetch: true*/'./virtualListDemo'));
const SliceList = dynamic(() => import(/* webpackPrefetch: true*/'./sliceList'));

ReactDom.render(
  <HashRouter>
    <ul>
      <li>
        <Link to="/">Home</Link>
      </li>
      <li>
        <Link to="/user">user</Link>
      </li>
      <li>
        <Link to="/sliceList">sliceList</Link>
      </li>
    </ul>
    <Routes>
      <Route path="/" element={Home}></Route>
      <Route path="/user" element={User}></Route>
      <Route path="/sliceList" element={SliceList}></Route>
    </Routes>
  </HashRouter>
, document.getElementById('root'))