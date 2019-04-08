import * as TYPE from './types';

export const initialize = data => ({
  type: TYPE.INITIALIZE,
  payload: data,
});

export const showVersion = () => ({
  type: TYPE.SHOW_VERSION,
});

export const hideVersion = () => ({
  type: TYPE.HIDE_VERSION,
});
