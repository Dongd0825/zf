import React from 'react'
import ReactDOM from 'react-dom/client'
import Counter1 from './components/counter1'
import Counter2 from './components/counter2'
import { Provider } from '../react-redux'
import store from './store'
import Counter2Fun from './components/counter2Fun'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  
  <React.StrictMode>
    <Provider store={store}>
      <Counter1></Counter1>
      <Counter2></Counter2>
      <Counter2Fun></Counter2Fun>
    </Provider>
  </React.StrictMode>
)
