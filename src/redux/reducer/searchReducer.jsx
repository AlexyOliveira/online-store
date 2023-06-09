import { SET_SEARCH } from '../actions';

const INITIAL_STATE = {
  products: [],
};

const productReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case SET_SEARCH:
    return {
      ...state,
      products: action.payload,
    };
  default:
    return state;
  }
};

export default productReducer;
