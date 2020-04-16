import * as TYPE from 'actions/types';

const initialState = {
  accounts: null,
  username: '',
  genesis: '',
};

export default (state = initialState, action) => {
  switch (action.type) {
    case TYPE.INITIALIZE:
      const userInfo = action.payload.userStatus;
      return {
        ...state,
        username: userInfo.username,
        genesis: userInfo.genesis,
      };
    case TYPE.SET_USER_ACCOUNTS:
      return { ...state, accounts: action.payload };
    case TYPE.UPDATE_USER_INFO:
      const updatedInfo = action.payload;
      return {
        ...state,
        username: updatedInfo.username,
        genesis: updatedInfo.genesis,
      };
    case TYPE.SET_USERNAME:
      return { ...state, username: action.payload };
    case TYPE.SET_GENESIS:
      return { ...state, genesis: action.payload };
    default:
      return state;
  }
};
