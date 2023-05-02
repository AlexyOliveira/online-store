export const SET_SEARCH = 'SET_FAVORITE';
export const SET_CART = 'SET_CART';
export const SET_PRODUCTS_SUM = 'SET_PRODUCTS_SUM';
export const SET_IS_LOADING = 'SET_IS_LOADING';

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

export const isLoadingReducer = (payload) => ({
  type: SET_IS_LOADING,
  payload,
});
