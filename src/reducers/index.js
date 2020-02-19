import initialized from './initialized';
import theme from './theme';
import coreInfo from './coreInfo';
import settings from './settings';
import ui from './ui';
import invoiceDrafts from './invoiceDrafts';
import invoices from './invoices';
import popUps from './popUps';
import user from './user';

const {
  libraries: {
    Redux: { combineReducers },
    ReduxForm: { reducer },
  },
} = NEXUS;

export default function createReducer() {
  return combineReducers({
    initialized,
    theme,
    coreInfo,
    settings,
    ui,
    invoiceDrafts,
    invoices,
    popUps,
    user,
    form: reducer,
  });
}
