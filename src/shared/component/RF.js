const adapters = new Map();

export default function RF(component) {
  if (!adapters.get(component)) {
    adapters.set(component, function ({ input, meta, ...rest }) {
      const Component = component;
      return (
        <Component error={meta.touched && meta.error} {...input} {...rest} />
      );
    });
  }
  return adapters.get(component);
}
