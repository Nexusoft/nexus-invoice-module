import * as TYPE from 'actions/types';

const initialState = {
  accounts: null,
  username: '',
  genesis: '',
};

export default (state = initialState, action) => {
  switch (action.type) {
    case TYPE.SET_USER_ACCOUNTS:
      return { ...state, accounts: action.payload };
    case TYPE.SET_USERNAME:
      return { ...state, username: action.payload };
    case TYPE.SET_GENESIS:
      return { ...state, genesis: action.payload };
    default:
      return state;
  }
};
