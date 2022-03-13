import React from 'react';
import ReactDOM from 'react-dom';
import ColorPipette from './color-pipette.ts';
// import App from './App';

// ReactDOM.render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>,
//   document.getElementById('root')
// );

// 初始化
const pipette = new ColorPipette({
  container: document.body,
  scale: 2,
  listener: {
    onOk: ({ color, colors }) => {
      console.log(color, colors);
    },
  }
});
// 开始取色
pipette.start();
