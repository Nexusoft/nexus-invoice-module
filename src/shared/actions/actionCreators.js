import newUID from 'gui/newUID';
import * as TYPE from './types';

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
