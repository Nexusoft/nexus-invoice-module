import inputValue from './inputValue';

const {
  libraries: {
    Redux: { combineReducers },
  },
} = nexusWallet;

export default combineReducers({
  inputValue,
});
