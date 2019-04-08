import * as TYPE from 'actions/types';

const initialState = false;

export default (state = initialState, action) => {
  switch (action.type) {
    case TYPE.SHOW_VERSION:
      return true;

    case TYPE.HIDE_VERSION:
      return false;

    default:
      return state;
  }
};
