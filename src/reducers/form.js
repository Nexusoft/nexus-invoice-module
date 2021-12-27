import { reducer } from 'redux-form';
import * as TYPE from 'actions/types';

const initialState = null;

export default (state = initialState, action) => {
  switch (action.type) {
    case TYPE.INITIALIZE: {
      const { moduleState } = action.payload;
      return (moduleState && moduleState.form) || initialState;
    }

    default:
      return reducer(state, action);
  }
};
