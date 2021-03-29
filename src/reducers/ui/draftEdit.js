import * as TYPE from 'actions/types';

const initialState = null;

export default (state = initialState, action) => {
  switch (action.type) {
    case TYPE.INITIALIZE: {
      const { moduleState } = action.payload;
      return (moduleState && moduleState.ui.draftEdit) || initialState;
    }
    case TYPE.SET_DRAFT_TO_EDIT:
      return action.payload;
    case TYPE.REMOVE_DRAFT_TO_EDIT:
      return null;

    default:
      return state;
  }
};
