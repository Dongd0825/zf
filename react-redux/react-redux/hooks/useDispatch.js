import ReactReduxContext from '../ReactReduxContext'
import React from 'react';

function useDispatch() {
  const store = React.useContext(ReactReduxContext);
  return store.dispatch;
}

export default useDispatch;