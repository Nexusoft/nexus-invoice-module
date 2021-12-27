// react-redux library requires react as a peer dependency, so we re-export
// react from here and set an alias in webpack config so react-redux can find it
const {
  libraries: { React },
} = NEXUS;

const {
  Component,
  PureComponent,
  memo,
  createElement,
  createFactory,
  cloneElement,
  isValidElement,
  Children,
  Fragment,
  createRef,
  forwardRef,
  lazy,
  Suspense,
  useState,
  useEffect,
  useContext,
  useReducer,
  useCallback,
  useMemo,
  useRef,
  useImperativeHandle,
  useLayoutEffect,
  useDebugValue,
} = React;

export {
  Component,
  PureComponent,
  memo,
  createElement,
  createFactory,
  cloneElement,
  isValidElement,
  Children,
  Fragment,
  createRef,
  forwardRef,
  lazy,
  Suspense,
  useState,
  useEffect,
  useContext,
  useReducer,
  useCallback,
  useMemo,
  useRef,
  useImperativeHandle,
  useLayoutEffect,
  useDebugValue,
};

export default React;
