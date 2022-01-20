import * as TYPE from 'actions/types';

const initialState = null;

export default (state = initialState, action) => {
  switch (action.type) {
    case TYPE.SET_USER_ACCOUNTS:
      return action.payload;
    default:
      return state;
  }
};
