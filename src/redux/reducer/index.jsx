import { combineReducers } from 'redux';
import searchReducer from './searchReducer';
import productCartReducer from './productInCartReducer';
import productsSumReducer from './productsSum';
import isLoadingReducer from './isLoadingReducer';

const rootReducer = combineReducers({
  searchReducer,
  productCartReducer,
  productsSumReducer,
  isLoadingReducer,
});

export default rootReducer;
