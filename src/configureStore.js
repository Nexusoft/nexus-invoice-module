import createReducer from './reducers';
import storageMiddleware from 'middlewares/storageMiddleware';
import stateMiddleware from 'middlewares/stateMiddleware';

const {
  libraries: {
    Redux: { createStore, compose, applyMiddleware },
  },
} = NEXUS;

export default function configureStore() {
  const middlewares = [
    storageMiddleware(state => state.settings),
    stateMiddleware(state => state.ui),
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
