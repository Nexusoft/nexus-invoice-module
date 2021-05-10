import * as TYPE from 'actions/types';

const initialState = [];

export default (state = initialState, action) => {
  switch (action.type) {
    case TYPE.INITIALIZE: {
      const { moduleState } = action.payload;
      return (moduleState && moduleState.modals) || initialState;
    }

    case TYPE.CREATE_POP_UP: {
      const {
        payload: { id, name, props },
      } = action;
      return [
        ...state,
        {
          id,
          name,
          props,
        },
      ];
    }

    case TYPE.REMOVE_POP_UP:
      return state.filter((m) => m.id !== action.payload);

    default:
      return state;
  }
};
