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
  ipc: { listen },
} = NEXUS;

listen('initialize', (evt, data) => {
  store.dispatch(initialize(data));
});

listen('core-info-updated', (evt, coreInfo) => {
  store.dispatch(updateCoreInfo(coreInfo));
});

listen('theme-updated', (evt, theme) => {
  store.dispatch(updateTheme(theme));
});

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
