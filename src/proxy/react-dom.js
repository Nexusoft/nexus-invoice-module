// react-redux library requires react-dom as a peer dependency, so we re-export
// react-dom from here and set an alias in webpack config so react-redux can find it
const {
  libraries: { ReactDOM },
} = NEXUS;

const {
  render,
  hydrate,
  unmountComponentAtNode,
  findDOMNode,
  createPortal,
  unstable_batchedUpdates,
} = ReactDOM;

export {
  render,
  hydrate,
  unmountComponentAtNode,
  findDOMNode,
  createPortal,
  unstable_batchedUpdates,
};

export default ReactDOM;
