import inputValue from './inputValue';
import invoices from './invoices';
import draftEdit from './draftEdit';

const {
  libraries: {
    Redux: { combineReducers },
  },
} = NEXUS;

export default combineReducers({
  inputValue,
  draftEdit,
  invoices,
});
