import { combineReducers } from 'redux';
import fiatCurrency from './fiatCurrency';
import exchangeRate from './exchangeRate';

export default combineReducers({
  fiatCurrency,
  exchangeRate,
});
