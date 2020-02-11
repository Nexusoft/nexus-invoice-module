import inputValue from './inputValue';
import invoices from './invoices';

const {
  libraries: {
    Redux: { combineReducers },
  },
} = NEXUS;

export default combineReducers({
  inputValue,
  invoices,
});
