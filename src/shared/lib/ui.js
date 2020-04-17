import * as TYPE from 'actions/types';
const {
  libraries: {
    ReduxForm: { reset },
  },
  utilities: { proxyRequest, apiCall },
} = NEXUS;

async function listAll(endpoint, params, limit = 100) {
  let list = [];
  let results = null;
  let page = 0;
  console.log(endpoint);
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

export const loadInvoices = () => async (dispatch) => {
  try {
    const invoices = await listAll('users/list/invoices');
    dispatch({ type: TYPE.SET_INVOICES, payload: invoices });
  } catch (err) {
    console.error('Failed listing Invoices', err);
  }
};

export const setInvoiceReferenceQuery = (search) => async (dispatch) => {
  console.log(search);
  dispatch({
    type: TYPE.SET_INVOICE_REFERENCE_FILTER,
    payload: search,
  });
};

export const setInvoiceTimeFilter = (timeSpan) => async (dispatch) => {
  dispatch({
    type: TYPE.SET_INVOICE_TIME_FILTER,
    payload: timeSpan,
  });
};

export const setInvoiceStatusFilter = (status) => async (dispatch) => {
  dispatch({
    type: TYPE.SET_INVOICE_STATUS_FILTER,
    payload: status,
  });
};

export const setInvoiceDescriptionFilter = (description) => async (
  dispatch
) => {
  dispatch({
    type: TYPE.SET_INVOICE_DESCRIPTION_FILTER,
    payload: description,
  });
};

export const setInvoicePastDueFilter = (pastDue) => async (dispatch) => {
  dispatch({
    type: TYPE.SET_INVOICE_PAST_DUE_FILTER,
    payload: pastDue,
  });
};

export const setInvoicePayableFilter = (payable) => async (dispatch) => {
  dispatch({
    type: TYPE.SET_INVOICE_PAYABLE_FILTER,
    payload: payable,
  });
};

export const setInvoiceRecipientFilter = (recipient) => async (dispatch) => {
  dispatch({
    type: TYPE.SET_INVOICE_RECEIPANT_FILTER,
    payload: recipient,
  });
};

export const resetForm = (formName) => {
  return reset(formName);
};

export const OpenPopUp = (component, props) => async (dispatch) => {
  console.log(component);
  dispatch({
    type: TYPE.SET_POP_UP,
    payload: { div: component, props: props },
  });
};

export const LoadAccounts = () => async (dispatch) => {
  const results = await apiCall('users/list/accounts');
  dispatch({
    type: TYPE.SET_USER_ACCOUNTS,
    payload: results,
  });
};

export const ClosePopUp = () => async (dispatch) => {
  console.log('CLOSING');
  dispatch({
    type: TYPE.CLOSE_POP_UP,
    payload: null,
  });
};

export const UpdateExchangeRate = () => async (dispatch, getState) => {
  try {
    const fiat = getState().settings.fiatCurrency;
    const result = await proxyRequest(
      `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=NXS&tsyms=${fiat}`,
      {}
    );
    console.log(result.data['RAW']['NXS'][fiat]);
    dispatch({
      type: TYPE.UPDATE_EXCHANGE_RATE,
      payload: result.data['RAW']['NXS'][fiat].PRICE,
    });
  } catch (error) {
    console.error(error);
  }
};
