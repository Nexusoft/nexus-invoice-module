import createReducer from './reducers';
import storageMiddleware from 'middlewares/storageMiddleware';
import stateMiddleware from 'middlewares/stateMiddleware';

const {
  libraries: {
    Redux: { createStore, compose, applyMiddleware },
  },
} = NEXUS;

export default function configureStore() {
  //Middlewares will automatically save when the state as changed,
  //ie state.settings will be stored on disk and will save every time state.settings is changed.
  const middlewares = [
    storageMiddleware((state) => state.settings), //Data saved to disk
    stateMiddleware((state) => state.ui), //Data saved to session
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
