import { combineReducers } from 'redux';
import searchReducer from './searchReducer';
import productIdReducer from './productIdReducer';

const rootReducer = combineReducers({
  searchReducer,
  productIdReducer,
});

export default rootReducer;
