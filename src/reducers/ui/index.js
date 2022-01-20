import { combineReducers } from 'redux';
import invoices from './invoices';
import draftEdit from './draftEdit';

export default combineReducers({
  draftEdit,
  invoices,
});
