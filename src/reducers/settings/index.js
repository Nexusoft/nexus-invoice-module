import { INITIALIZE } from 'nexus-module';
import { combineReducers } from 'redux';

import showingConnections from './showingConnections';

const reducer = combineReducers({
  showingConnections,
});

export default function (state, action) {
  switch (action.type) {
    case INITIALIZE:
      if (action.payload.storageData) {
        return action.payload.storageData;
      }

    default:
      return reducer(state, action);
  }
}
