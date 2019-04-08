import initialized from './initialized';
import theme from './theme';
import showingVersion from './showingVersion';
import coreInfo from './coreInfo';

const {
  libraries: {
    Redux: { combineReducers },
  },
} = nexusWallet;

export default function createReducer() {
  return combineReducers({
    initialized,
    theme,
    showingVersion,
    coreInfo,
  });
}
