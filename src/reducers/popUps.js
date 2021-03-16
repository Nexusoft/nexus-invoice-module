import * as TYPE from 'actions/types';

const initialState = null;

export default (state = initialState, action) => {
  switch (action.type) {
    case TYPE.INITIALIZE: {
      const { moduleState } = action.payload;
      return (moduleState && moduleState.popUps) || initialState;
    }
    case TYPE.SET_POP_UP:
      return action.payload;
    case TYPE.CLOSE_POP_UP:
      return null;
    default:
      return state;
  }
};
