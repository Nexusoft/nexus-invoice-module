import fiatCurrency from './fiatCurrency';
import exchangeRate from './exchangeRate';

const {
  libraries: {
    Redux: { combineReducers },
  },
} = NEXUS;

export default combineReducers({
  fiatCurrency,
  exchangeRate,
});
