
import { combineReducers, createStore } from '../../redux';
import { counter1, counter2 } from './reducers';

const combinedReducers = combineReducers({
  counter1,
  counter2
});

const store = createStore(combinedReducers);

export default store;