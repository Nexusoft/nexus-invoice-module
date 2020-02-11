export const setInvoiceReferenceQuery = search => {
  store.dispatch({
    type: TYPE.SET_INVOICE_REFERENCE_QUERY,
    payload: search,
  });
};

export const setInvoiceTimeFilter = timeSpan => {
  store.dispatch({
    type: TYPE.SET_INVOICE_TIME_FILTER,
    payload: timeSpan,
  });
};

export const setInvoiceStatusFilter = status => {
  store.dispatch({
    type: TYPE.SET_INVOICE_STATUS_FILTER,
    payload: status,
  });
};

export const resetForm = formName => {
  store.dispatch(reset(formName));
};
