export const SET_SEARCH = 'SET_FAVORITE';
export const SET_CART = 'SET_CART';

export const saveProducts = (payload) => ({
  type: SET_SEARCH,
  payload,
});

export const setProductInCart = (payload) => ({
  type: SET_CART,
  payload,
});
