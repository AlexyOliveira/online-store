import { combineReducers } from 'redux';
import searchReducer from './searchReducer';
import productCartReducer from './productInCartReducer';
import productsSumReducer from './productsSum';

const rootReducer = combineReducers({
  searchReducer,
  productCartReducer,
  productsSumReducer,
});

export default rootReducer;
