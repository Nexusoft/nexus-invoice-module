import * as TYPE from 'actions/types';

const initialState = null;

export default (state = initialState, action) => {
  switch (action.type) {
    case TYPE.INITIALIZE:
      return action.payload.coreInfo;

    case TYPE.UPDATE_CORE_INFO:
      return action.payload;

    default:
      return state;
  }
};
