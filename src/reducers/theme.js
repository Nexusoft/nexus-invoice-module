import * as TYPE from 'actions/types';

const initialState = null;

export default (state = initialState, action) => {
  switch (action.type) {
    case TYPE.INITIALIZE:
      return action.payload.theme;

    default:
      return state;
  }
};
