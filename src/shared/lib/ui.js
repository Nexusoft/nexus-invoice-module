const {
  Utilities: { apiCall },
} = NEXUS;

async function listAll(endpoint, params, limit = 100) {
  let list = [];
  let results = null;
  let page = 0;
  do {
    results = await apiCall(endpoint, { ...params, limit, page: page++ });
    if (!results) break;
    if (Array.isArray(results)) {
      list = list.concat(results);
    } else {
      console.log(results);
      throw new Error(
        `API result is expected to be an array, got ${typeof results}`
      );
    }
  } while (results.length === limit);
  return list;
}

export const loadInvoices = async () => {
  try {
    const invoices = await listAll('users/list/invoices');
    store.dispatch({ type: TYPE.SET_INVOICES, payload: invoices });
  } catch (err) {
    console.error('Failed listing Invoices', err);
  }
};

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

export function openModal(component, props) {
  store.dispatch({
    type: TYPE.CREATE_MODAL,
    payload: {
      id: newModalId(),
      component,
      props,
    },
  });
}

// Using regular function here to avoid circular dependency which causes error
export function removeModal(modalId) {
  store.dispatch({
    type: TYPE.REMOVE_MODAL,
    payload: { id: modalId },
  });
}
