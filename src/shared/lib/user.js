import * as TYPE from 'actions/types';

export const UpdateUserInfo = (userStatus) => async (dispatch) => {
  try {
    if (!userStatus) {
      dispatch({
        type: TYPE.UPDATE_USER_INFO,
        payload: { username: null, genesis: null },
      });
    }
    dispatch({ type: TYPE.UPDATE_USER_INFO, payload: userStatus });
  } catch (error) {
    console.error(error);
  }
};
