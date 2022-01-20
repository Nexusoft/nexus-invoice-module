import newUID from 'gui/newUID';
import * as TYPE from './types';

export const initialize = (data) => ({
  type: TYPE.INITIALIZE,
  payload: data,
});

export const updateCoreInfo = (coreInfo) => ({
  type: TYPE.UPDATE_CORE_INFO,
  payload: coreInfo,
});

export const updateTheme = (theme) => ({
  type: TYPE.UPDATE_THEME,
  payload: theme,
});

export const showConnections = () => ({
  type: TYPE.SHOW_CONNECTIONS,
});

export const hideConnections = () => ({
  type: TYPE.HIDE_CONNECTIONS,
});

export const createModal = (name, props) => ({
  type: TYPE.CREATE_POP_UP,
  payload: {
    id: newUID(),
    name,
    props,
  },
});

export const removeModal = (id) => ({
  type: TYPE.REMOVE_POP_UP,
  payload: id,
});
