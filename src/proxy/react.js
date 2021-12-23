// react-redux library requires react as a peer dependency, so we re-export
// react from here and set an alias in webpack config so react-redux can find it
const {
  libraries: { React },
} = NEXUS;

const {
  useMemo,
  useContext,
  useReducer,
  useRef,
  useEffect,
  useLayoutEffect,
  useDebugValue,
} = React;

export default React;

export {
  useMemo,
  useContext,
  useReducer,
  useRef,
  useEffect,
  useLayoutEffect,
  useDebugValue,
};
