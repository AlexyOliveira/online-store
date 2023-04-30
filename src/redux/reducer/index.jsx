import { combineReducers } from 'redux';
import searchReducer from './searchReducer';
import productCartReducer from './productInCartReducer';
import productsSumReducer from './productsSum';
import screenReducer from './screenWidthReducer';

const rootReducer = combineReducers({
  searchReducer,
  productCartReducer,
  productsSumReducer,
  screenReducer,
});

export default rootReducer;
