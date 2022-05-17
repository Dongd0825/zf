import React from 'react';
import ReactDOM from 'react-dom/client';
import {
  FixedSizeList, 
  // VariableSizeList,
  // DynamicSizeList
} from './react-window';
import "./index.css";

const root = ReactDOM.createRoot(document.getElementById('root'));

const Row = ({ index, style, isScrolling }) => (
  <div className={index % 2 ? "ListItemOdd" : "ListItemEven"} style={style}>
    {isScrolling ? 'isScrolling': index}
  </div>
)
const domRef = React.createRef();

root.render(
  <React.StrictMode>
    <button onClick={() => {
      domRef.current.scrollToItem(50)
    }}>to50</button>
    <FixedSizeList
      ref={domRef}
      className='List'
      height={200}
      itemCount={1000}
      itemSize={30}
      width={100}
      useIsScrolling={true}
    >
      {Row}
    </FixedSizeList>
  </React.StrictMode>
);


// 可变高度
// const rowHeights = new Array(1000)
//   .fill(true)
//   .map(() => 25 + Math.round(Math.random() * 50));
 
// const getItemSize = index => rowHeights[index];

// const Row = ({ index, style }) => (
//   <div style={{...style, border: '1px solid black'}}>Row {index}</div>
// );

// root.render(
//   <React.StrictMode>
//     <VariableSizeList
//       className='List'
//       height={150}
//       itemCount={1000}
//       itemSize={getItemSize}
//       width={300}
//     >
//       {Row}
//       {/* <Row/> */}
//     </VariableSizeList>
//   </React.StrictMode>
// );

// 动态高度
// 不需要传itemSize，通过内容自己撑开
// const items = [];
// for (let i = 0; i < 1000; i++) {
//   const height = (30 + Math.floor(Math.random() * 20)) + 'px';
//   const style = {
//       height,
//       width: `100%`,
//       backgroundColor: i % 2 ? 'green' : "orange",
//       display: 'flex',
//       alignItems: 'center',
//       justifyContent: 'center'
//   }
//   items.push(<div style={style}>Row {i}</div>);
// }

// BUG 可变高度isscrolling错误 显示失败
// const Row = ({ index, isScrolling }) => {
//   console.log('isScrolling', isScrolling)
//   return isScrolling ? <div>isScrolling</div> : items[index];
// }

// root.render(
//   <React.StrictMode>
//     <DynamicSizeList
//      className='List'
//      height={150}
//      itemCount={1000}
//      width={300}
//      isDynamic={true}
//      useIsScrolling={true}
//     >
//       {Row}
//     </DynamicSizeList>
//   </React.StrictMode>
// )