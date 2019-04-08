import * as TYPE from 'actions/types';

const initialState = false;

export default (state = initialState, action) => {
  switch (action.type) {
    case TYPE.INITIALIZE:
      return true;

    default:
      return state;
  }
};
