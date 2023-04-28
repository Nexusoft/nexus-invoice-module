import * as TYPE from 'actions/types';

export const setDraftToEdit = (draft) => async (dispatch) => {
  dispatch({
    type: TYPE.SET_DRAFT_TO_EDIT,
    payload: draft,
  });
};

export const removeDraftToEdit = () => async (dispatch) => {
  dispatch({
    type: TYPE.REMOVE_DRAFT_TO_EDIT,
    payload: null,
  });
};

export const loadInvoiceDrafts = (invoices) => {
  return {
    type: TYPE.LOAD_INVOICE_DRAFTS,
    payload: invoices,
  };
};

export const addNewDraft = (draft) => async (dispatch, getState) => {
  const results = dispatch({
    type: TYPE.ADD_NEW_INVOICE_DRAFT,
    payload: {
      ...getState().form['InvoiceForm'].values,
      draftOwner: getState().nexus.userStatus.genesis,
    },
  });
};

//not currently used
export const updateDraft = (name, contact) => async (dispatch) => {
  dispatch({
    type: TYPE.UPDATE_INVOICE_DRAFT,
    payload: { name, contact },
  });
};

export const deleteDraft = () => async (dispatch, getState) => {
  dispatch({
    type: TYPE.DELETE_INVOICE_DRAFT,
    payload: getState().form['InvoiceForm'].values.draftTimeStamp,
  });
  dispatch({
    type: TYPE.CLOSE_POP_UP,
    payload: null,
  });
};
