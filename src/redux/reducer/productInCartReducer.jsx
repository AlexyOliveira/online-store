import { SET_CART } from '../actions';

const INITIAL_STATE = {
  cart: [],
};

const productCartReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case SET_CART:
    return {
      ...state,
      cart: state.cart.concat(action.payload),
    };
  default:
    return state;
  }
};

export default productCartReducer;
