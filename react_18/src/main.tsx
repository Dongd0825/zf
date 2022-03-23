import React from 'react';
import ReactDom from 'react-dom';
import Suspense from '../route/Suspense';
import SuspenseList from '../route/SuspenseList';
import BatchState from '../route/BatchState';
import { HashRouter as Router, Route, Routes,Link} from 'react-router-dom';
import StartTransiton from '../route/StartTransiton';
import UseDeferredValue from '../route/UseDefferdValue';

// legacy 旧模式渲染是同步的
// ReactDom.render(<h1>hello</h1>, document.getElementById('root'));

// @ts-ignore
ReactDom.createRoot(document.getElementById('root')).render(
  // @ts-ignore
  <Router>
    <ul>
      <li>
        <Link to="/BatchState">BatchState</Link>
      </li>
      <li>
        <Link to="/Suspense">Suspense</Link>
      </li>
      <li>
        <Link to="/SuspenseList">SuspenseList</Link>
      </li>
      <li>
        <Link to="/StartTransiton">StartTransiton</Link>
      </li>
      <li>
        <Link to="/UseDeferredValue">UseDeferredValue</Link>
      </li>
    </ul>
    <Routes>
      <Route path="/BatchState" element={<BatchState></BatchState>}/>
      <Route path="/Suspense" element={<Suspense></Suspense>}/>
      <Route path="/SuspenseList" element={<SuspenseList></SuspenseList>}/>
      <Route path="/StartTransiton" element={<StartTransiton></StartTransiton>}/>
      <Route path="/UseDeferredValue" element={<UseDeferredValue></UseDeferredValue>}/>
    </Routes>
  </Router>
);
