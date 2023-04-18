import { SET_PRODUCT_ID } from '../actions';

const INITIAL_STATE = {
  id: '',
};

const productIdReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case SET_PRODUCT_ID:
    return {
      ...state,
      id: action.payload,
    };
  default:
    return state;
  }
};

export default productIdReducer;
