export const SET_SEARCH = 'SET_FAVORITE';
export const SET_CART = 'SET_CART';
export const SET_PRODUCTS_SUM = 'SET_PRODUCTS_SUM';
export const SET_SCREEN_WIDTH = 'SET_SCREEN_WIDTH';

export const saveProducts = (payload) => ({
  type: SET_SEARCH,
  payload,
});

export const setProductInCart = (payload) => ({
  type: SET_CART,
  payload,
});

export const setProductsSum = (payload) => ({
  type: SET_PRODUCTS_SUM,
  payload,
});

export const screenWidthReducer = (payload) => ({
  type: SET_SCREEN_WIDTH,
  payload,
});
