import * as TYPE from 'actions/types';

const initialState = false;

export default (state = initialState, action) => {
  switch (action.type) {
    case TYPE.INITIALIZE: {
      return action.payload.settings.fiatCurrency;
    }
    default:
      return state;
  }
};
