import { createStore, compose, applyMiddleware } from 'redux';

import createReducer from './reducers';
import { storageMiddleware, stateMiddleware } from 'nexus-module';

const getPersistedState = (() => {
  let cache = null;
  return (state) => {
    if (state) {
      const { ui, invoices, modals, form } = state;
      if (
        !cache ||
        cache.ui !== ui ||
        cache.invoices !== invoices ||
        cache.modals !== modals ||
        cache.form !== form
      ) {
        cache = { ui, invoices, modals, form };
      }
    }
    return cache;
  };
})();

export default function configureStore() {
  //Middlewares will automatically save when the state as changed,
  //ie state.settings will be stored on disk and will save every time state.settings is changed.
  const middlewares = [
    storageMiddleware((state) => state.settings), //Data saved to disk
    stateMiddleware(getPersistedState), //Data saved to session
  ];
  const enhancers = [applyMiddleware(...middlewares)];

  const composeEnhancers =
    process.env.NODE_ENV !== 'production' &&
    typeof window === 'object' &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
      ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
          shouldHotReload: false,
        })
      : compose;

  const store = createStore(createReducer(), composeEnhancers(...enhancers));

  if (module.hot) {
    module.hot.accept('./reducers', () => {
      store.replaceReducer(createReducer());
    });
  }

  return store;
}
