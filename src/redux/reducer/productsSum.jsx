import { SET_PRODUCTS_SUM } from '../actions';

const INITIAL_STATE = {
  sum: 0,
};

const productsSumReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case SET_PRODUCTS_SUM:
    return {
      ...state,
      sum: action.payload,
    };
  default:
    return state;
  }
};

export default productsSumReducer;
