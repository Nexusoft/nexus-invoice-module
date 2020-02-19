import * as TYPE from 'actions/types';

const initialState = {
  accounts: null,
  userName: '',
};

export default (state = initialState, action) => {
  switch (action.type) {
    case TYPE.SET_USER_ACCOUNTS:
      return { ...state, accounts: action.payload };

    default:
      return state;
  }
};
