export default (function () {
  let counter = 1;
  return () => `uid-${counter++}`;
})();
