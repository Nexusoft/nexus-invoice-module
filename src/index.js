import configureStore from './configureStore';
import App from './App';
import { initialize } from './actions/actionCreators';

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

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
