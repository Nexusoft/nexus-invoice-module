import * as TYPE from 'actions/types';

const {
  libraries: {
    ReduxForm: { reducer },
  },
} = NEXUS;
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
