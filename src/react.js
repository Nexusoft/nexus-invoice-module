// Victory library requires React as a peer dependency, so we re-export
// React from here and set an alias in webpack config so Victory can find it
const {
  libraries: { React },
} = NEXUS;

export default React;

export const Children = React.Children;
