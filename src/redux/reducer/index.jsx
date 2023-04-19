import { combineReducers } from 'redux';
import searchReducer from './searchReducer';
import productCartReducer from './productInCartReducer';

const rootReducer = combineReducers({
  searchReducer,
  productCartReducer,
});

export default rootReducer;
