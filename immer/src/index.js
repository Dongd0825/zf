import {useImmerState} from './immer';
import React from 'react';
import ReactDom from 'react-dom';

let id = 1;
function Todos () {
  const [todos, setTodos] = useImmerState({list: []});

  function handleClick() {
    setTodos((draft) => {
      draft.list.push(id++);
    })
  }

  return (
    <>
      <button onClick={handleClick}>+</button>
      <div>{todos.list.map((_todo) => (
        <div key={_todo}>{_todo}</div>
      ))}</div>
    </>
  )
}
ReactDom.render(<Todos></Todos>, document.getElementById('root'));