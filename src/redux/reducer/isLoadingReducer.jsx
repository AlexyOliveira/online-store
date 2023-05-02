import { SET_IS_LOADING } from '../actions';

const INITIAL_STATE = {
  loading: false,
};

const screenReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case SET_IS_LOADING:
    return {
      ...state,
      loading: action.payload,
    };
  default:
    return state;
  }
};

export default screenReducer;
