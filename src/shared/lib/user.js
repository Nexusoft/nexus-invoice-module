import * as TYPE from 'actions/types';
const {
  libraries: {
    ReduxForm: { reset },
  },
  utilities: { apiCall },
} = NEXUS;

export const SetUserName = () => async dispatch => {
  try {
    const result = await apiCall('users/get/status');
    dispatch({ type: TYPE.SET_USERNAME, payload: result.username });
    dispatch({ type: TYPE.SET_GENESIS, payload: result.genesis });
  } catch (error) {
    console.error(error);
  }
};

export const SetGenesis = () => async dispatch => {
  try {
    const result = await apiCall('users/get/status');
    dispatch({ type: TYPE.SET_GENESIS, payload: result.genesis });
  } catch (error) {
    console.error(error);
  }
};
