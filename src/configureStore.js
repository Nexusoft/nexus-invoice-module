import createReducer from './reducers';
import storageMiddleware from 'middlewares/storageMiddleware';
import stateMiddleware from 'middlewares/stateMiddleware';
import thunk from 'redux-thunk';

const {
  libraries: {
    Redux: { createStore, compose, applyMiddleware },
  },
} = NEXUS;

const getPersistedState = (() => {
  let cache = null;
  return (state) => {
    if (state) {
      const { ui, invoices, popUps, form } = state;
      if (
        !cache ||
        cache.ui !== ui ||
        cache.invoices !== invoices ||
        cache.popUps !== popUps ||
        cache.form !== form
      ) {
        cache = { ui, invoices, popUps, form };
      }
    }
    return cache;
  };
})();

export default function configureStore() {
  const middlewares = [
    storageMiddleware((state) => state.invoiceDrafts),
    stateMiddleware(getPersistedState),
    thunk,
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
