import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

let VirtualDom = (
  <div key="A1">
    <div key="B1">B1</div>
    <div key="B2">B2</div>
  </div>
)
ReactDOM.render(
  VirtualDom,
  document.getElementById('root')
);

// React.unstable_createRoot(document.getElementById('root')).render(<App />)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
