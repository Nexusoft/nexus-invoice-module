import inputValue from './inputValue';

const {
  libraries: {
    Redux: { combineReducers },
  },
} = NEXUS;

export default combineReducers({
  inputValue,
});
