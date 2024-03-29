const {
  utilities: { showErrorDialog },
} = NEXUS;

const __ = input => input;

export function resolveValue(input) {
  if (input && input.target) {
    const el = input.target;
    if (el.type === 'checkbox') {
      return el.checked;
    } else if (el.type === 'number') {
      return parseInt(el.value);
    } else {
      return el.value;
    }
  }
  return input;
}

export function handleError(error, message = __('Error')) {
  showErrorDialog({
    message,
    note: (error && error.message) || __('Unknown error'),
  });
}

export function passRef(el, ref) {
  if (typeof ref === 'function') {
    ref(el);
  } else if (ref) {
    ref.current = el;
  }
}

export function errorHandler(message) {
  return (errors, dispatch, submitError) => {
    console.error(errors);
    console.error(dispatch);
    console.error(submitError);
    // If errors object has some values it means the form validation failed
    // In that case, no need to open an error dialog
    if (!errors || !Object.keys(errors).length) {
      handleError(submitError, message);
    }
  };
}

export const numericOnly = value =>
  (value ? String(value) : '').replace(/\D/g, '');

export const trimText = text => text && text.trim();

export const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
