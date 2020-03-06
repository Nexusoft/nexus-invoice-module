// Victory library requires React as a peer dependency, so we re-export
// React from here and set an alias in webpack config so Victory can find it
const {
  libraries: { React, ReactDOM },
} = NEXUS;

export default ReactDOM;

export const Component = ReactDOM.Component;
