import configureStore from './configureStore';
import App from './App';
import {
  initialize,
  updateCoreInfo,
  updateTheme,
} from './actions/actionCreators';
import ReactDOM from 'react-dom';

const store = configureStore();

const {
  libraries: {
    React,

    ReactRedux: { Provider },
  },
  utilities: { onceInitialize, onCoreInfoUpdated, onThemeUpdated },
} = NEXUS;

onceInitialize(data => {
  store.dispatch(initialize(data));
});

onCoreInfoUpdated(coreInfo => {
  store.dispatch(updateCoreInfo(coreInfo));
});

onThemeUpdated(theme => {
  store.dispatch(updateTheme(theme));
});

console.log(store);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
