import { combineReducers } from 'redux';

import initialized from './initialized';
import theme from './theme';
import coreInfo from './coreInfo';
import settings from './settings';
import ui from './ui';
import user from './user';

export default function createReducer() {
  return combineReducers({
    initialized,
    theme,
    coreInfo,
    settings,
    ui,
    user,
  });
}
