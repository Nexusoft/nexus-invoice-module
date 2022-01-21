import { INITIALIZE } from 'nexus-module';
import * as TYPE from 'actions/types';

const initialState = false;

export default (state = initialState, action) => {
  switch (action.type) {
    case INITIALIZE:
      return action.payload.storageData?.settings.exchangeRate || state;

    case TYPE.UPDATE_EXCHANGE_RATE: {
      return action.payload;
    }
    default:
      return state;
  }
};
