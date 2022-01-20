import * as TYPE from './types';

export const showConnections = () => ({
  type: TYPE.SHOW_CONNECTIONS,
});

export const hideConnections = () => ({
  type: TYPE.HIDE_CONNECTIONS,
});

export const updateInput = (inputValue) => ({
  type: TYPE.UPDATE_INPUT,
  payload: inputValue,
});
