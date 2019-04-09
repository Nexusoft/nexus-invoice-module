import configureStore from './configureStore';
import App from './App';
import {
  initialize,
  updateCoreInfo,
  updateTheme,
} from './actions/actionCreators';

const store = configureStore();

const {
  libraries: {
    React,
    ReactDOM,
    ReactRedux: { Provider },
  },
  on,
} = nexusWallet;

on('initialize', (evt, data) => {
  store.dispatch(initialize(data));
});

on('core-info-updated', (evt, coreInfo) => {
  store.dispatch(updateCoreInfo(coreInfo));
});

on('theme-updated', (evt, theme) => {
  store.dispatch(updateTheme(theme));
});

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
