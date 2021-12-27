export default function RF({ as: Component, input, meta, ...rest }) {
  return <Component error={meta.touched && meta.error} {...input} {...rest} />;
}
