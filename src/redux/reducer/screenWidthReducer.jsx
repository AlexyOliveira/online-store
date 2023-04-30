import { SET_SCREEN_WIDTH } from '../actions';

const INITIAL_STATE = {
  screen: 0,
};

const screenReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case SET_SCREEN_WIDTH:
    return {
      ...state,
      screen: action.payload,
    };
  default:
    return state;
  }
};

export default screenReducer;
