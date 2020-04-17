import fiatCurrency from './fiatCurrency';

const {
  libraries: {
    Redux: { combineReducers },
  },
} = NEXUS;

export default combineReducers({
  fiatCurrency,
});
