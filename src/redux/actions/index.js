export const SET_SEARCH = 'SET_FAVORITE';
export const SET_PRODUCT_ID = 'SET_PRODUCT_ID';

export const saveProducts = (payload) => ({
  type: SET_SEARCH,
  payload,
});

export const setProductId = (payload) => ({
  type: SET_PRODUCT_ID,
  payload,
});
