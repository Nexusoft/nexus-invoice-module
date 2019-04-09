import showingVersion from './showingVersion';

const {
  libraries: {
    Redux: { combineReducers },
  },
} = nexusWallet;

export default combineReducers({
  showingVersion,
});
