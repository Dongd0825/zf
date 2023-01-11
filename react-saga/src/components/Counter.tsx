import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import * as actionTypes from '../store/action-types';

function Counter() {
  const number = useSelector(state => state.number);
  const dispatch = useDispatch();

  return (
    <div>
      <p>{number}</p>
      <button onClick={() => dispatch({ type: actionTypes.ASYNC_ADD })}>+</button>
    </div>
  )
}

export default Counter;