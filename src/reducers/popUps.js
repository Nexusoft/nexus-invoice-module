import * as TYPE from 'actions/types';

const initialState = null;

export default (state = initialState, action) => {
  switch (action.type) {
    case TYPE.SET_POP_UP:
      return action.payload;
    case TYPE.CLOSE_POP_UP:
      return null;
    default:
      return state;
  }
};
