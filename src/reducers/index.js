import { combineReducers } from 'redux';
import { walletDataReducer } from 'nexus-module';

import settings from './settings';
import ui from './ui';

export default function createReducer() {
  return combineReducers({
    settings,
    ui,
    nexus: walletDataReducer,
  });
}
