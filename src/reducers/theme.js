import * as TYPE from 'actions/types';

const initialState = null;

export default (state = initialState, action) => {
  switch (action.type) {
    case TYPE.INITIALIZE:
      return action.payload.theme;

    case TYPE.UPDATE_THEME:
      return action.payload;

    default:
      return state;
  }
};
