import showingVersion from './showingVersion';

const {
  libraries: {
    Redux: { combineReducers },
  },
} = NEXUS;

export default combineReducers({
  showingVersion,
});
