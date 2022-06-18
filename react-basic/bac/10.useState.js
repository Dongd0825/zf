import React from './react';
import ReactDOM, { useState } from './react-dom';

function App () {
  const [num, setNum] = useState(0);
  console.log('render')

  const handleClick = () => {
    setNum(num + 1);

    // 这里执行时，num为0，所以把num设置为0+1，如果setNum支持参数为oldState，则num为1+1
    setTimeout(() => {
      setNum(num + 1);//1
    })

    setTimeout(() => {
      setNum(num => num + 1);//2
    })
  }
  return (
    <div>
      {num}
      <div onClick={handleClick}>+</div>
    </div>
  )
}
ReactDOM.render(
    <App />, document.getElementById('root'));