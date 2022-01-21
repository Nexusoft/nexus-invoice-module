import { reducer } from 'redux-form';

const initialState = null;

export default (state = initialState, action) => {
  switch (action.type) {
    default:
      return reducer(state, action);
  }
};
