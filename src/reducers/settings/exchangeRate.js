import * as TYPE from 'actions/types';

const initialState = false;

export default (state = initialState, action) => {
  switch (action.type) {
    case TYPE.UPDATE_EXCHANGE_RATE: {
      console.error(action);
      return action.payload;
    }
    default:
      return state;
  }
};
