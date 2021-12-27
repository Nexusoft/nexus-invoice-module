import { combineReducers } from 'redux';
import inputValue from './inputValue';
import invoices from './invoices';
import draftEdit from './draftEdit';

export default combineReducers({
  inputValue,
  draftEdit,
  invoices,
});
