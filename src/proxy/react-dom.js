// react-redux library requires react-dom as a peer dependency, so we re-export
// react-dom from here and set an alias in webpack config so react-redux can find it
const {
  libraries: { ReactDOM },
} = NEXUS;

const { unstable_batchedUpdates } = ReactDOM;

export default ReactDOM;

export { unstable_batchedUpdates };
