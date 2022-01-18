import { INITIALIZE } from 'nexus-module';
import * as TYPE from 'actions/types';

const initialState = '';

export default (state = initialState, action) => {
  switch (action.type) {
    case INITIALIZE: {
      const { inputValue } = action.payload.moduleState || {};
      return inputValue !== undefined ? inputValue : state;
    }

    case TYPE.UPDATE_INPUT:
      return action.payload;

    default:
      return state;
  }
};
