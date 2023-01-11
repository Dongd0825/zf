import React from 'react'
import ReactDOM from 'react-dom/client'
import Counter from './components/Counter'
import {Provider} from 'react-redux';
import store from './store';
ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <Provider store={store}><Counter/></Provider>
)
