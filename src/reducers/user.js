import * as TYPE from 'actions/types';

const initialState = {};

export default (state = initialState, action) => {
  switch (action.type) {
    case TYPE.INITIALIZE:
      return action.payload.userStatus;

    case TYPE.UPDATE_USER_STATUS:
      return action.payload;
    default:
      return state;
  }
};
