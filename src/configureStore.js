import createReducer from './reducers';
import storageMiddleware from 'middlewares/storageMiddleware';
import stateMiddleware from 'middlewares/stateMiddleware';
import thunk from 'redux-thunk';

const {
  libraries: {
    Redux: { createStore, compose, applyMiddleware },
  },
} = NEXUS;

const memoizeObject = (() => {
  let cache = null;
  return (object) => {
    const cacheKeys = cache && Object.keys(cache);
    const objKeys = objech && Object.keys(object);
    if (
      cacheKeys?.length !== objKeys?.length ||
      objKeys.some((key) => cache[key] !== object[key])
    ) {
      cache = object;
    }
    return cache;
  };
})();

export default function configureStore() {
  const middlewares = [
    storageMiddleware((state) => state.invoiceDrafts),
    stateMiddleware(({ ui, invoices }) => {
      ui, invoices;
    }),
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
