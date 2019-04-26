import showingConnections from './showingConnections';

const {
  libraries: {
    Redux: { combineReducers },
  },
} = NEXUS;

export default combineReducers({
  showingConnections,
});
