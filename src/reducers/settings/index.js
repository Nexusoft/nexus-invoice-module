import { combineReducers } from 'redux';
import exchangeRate from './exchangeRate';

const reducer = combineReducers({
  exchangeRate,
});

export default function (state, action) {
  switch (action.type) {
    case INITIALIZE:
      if (action.payload.storageData) {
        return action.payload.storageData.settings;
      }

    default:
      return reducer(state, action);
  }
}
