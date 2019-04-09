import initialized from './initialized';
import theme from './theme';
import coreInfo from './coreInfo';
import settings from './settings';

const {
  libraries: {
    Redux: { combineReducers },
  },
} = nexusWallet;

export default function createReducer() {
  return combineReducers({
    initialized,
    theme,
    coreInfo,
    settings,
  });
}
