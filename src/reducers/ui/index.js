import { INITIALIZE } from 'nexus-module';
import { combineReducers } from 'redux';

import inputValue from './inputValue';

const reducer = combineReducers({
  inputValue,
});

export default function (state, action) {
  switch (action.type) {
    case INITIALIZE:
      if (action.payload.moduleState) {
        return action.payload.moduleState;
      }

    default:
      return reducer(state, action);
  }
}
