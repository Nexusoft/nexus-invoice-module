import * as TYPE from 'actions/types';

const initialState = [];

export default (state = initialState, action) => {
  switch (action.type) {
    case TYPE.INITIALIZE: {
      const { moduleState } = action.payload;
      return (moduleState && moduleState.invoices) || initialState;
    }
    case TYPE.SET_INVOICES: {
      return action.payload;
    }
    default:
      return state;
  }
};
