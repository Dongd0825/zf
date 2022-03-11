import React from 'react';
import ReactDOM from 'react-dom';

ReactDOM.render(
  <React.StrictMode>
    <Counter />
  </React.StrictMode>,
  document.getElementById('root')
);

function reducer(state, action) {
  if (action.type === 'add') {
    return state + 1;
  } else {
    return state;
  }
}
function Counter() {
  console.log('a');
  
  const [number, setNumber] = React.useReducer(reducer, 0)
  return (
    <div>
      <div onClick={() => setNumber({type: 'add'})}>{number}</div>
    </div>
  )
}
