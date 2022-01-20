import { combineReducers } from 'redux';
import { walletDataReducer } from 'nexus-module';

import settings from './settings';
import ui from './ui';
import invoiceDrafts from './invoiceDrafts';
import invoices from './invoices';
import modals from './modals';
import userAccounts from './userAccounts';
import form from './form';

export default function createReducer() {
  return combineReducers({
    settings,
    ui,
    invoiceDrafts,
    invoices,
    modals,
    userAccounts,
    form,
    nexus: walletDataReducer,
  });
}
