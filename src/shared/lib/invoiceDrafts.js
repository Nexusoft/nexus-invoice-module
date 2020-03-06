import * as TYPE from 'actions/types';
import fs from 'fs';
import path from 'path';
import Ajv from 'ajv';
import { readJson, writeJson } from 'gui/json';

const fileName = 'invoicedrafts.json';
const filePath = path.join('/', fileName);

const {
  utilities: { updateStorage },
} = NEXUS;

function saveInvoiceDraftsToFile(invoiceDrafts) {
  console.log('Saving');
  console.log(invoiceDrafts);
  return writeJson(filePath, { invoiceDrafts });
}

const loadInvoiceDraftsFile = () => {
  console.log('Loading Drafts');
  const schema = {
    patternProperties: {
      '^.+$': {
        required: ['invoiceReference', 'items'],
        properties: {
          reference: { type: 'string' },
          items: {
            type: 'array',
            minItems: 1,
          },
        },
      },
    },
  };
  const ajv = new Ajv();
  const validate = ajv.compile(schema);

  //if (fs.existsSync(filePath)) {
  if (false) {
    const json = readJson(filePath);
    console.log('Reaading File');
    console.log(json);
    let invoiceDrafts, valid;
    if (json && json.invoiceDrafts) {
      invoiceDrafts = json.invoiceDrafts;
      valid = validate(invoiceDrafts);
      if (valid) saveInvoiceDraftsToFile(invoiceDrafts);
    } else {
      invoiceDrafts = json.invoiceDrafts;
      valid = validate(invoiceDrafts);
    }

    if (valid) {
      return invoiceDrafts;
    } else {
      console.error(
        'Invoice Drafts validation error: ' + ajv.errorsText(validate.errors)
      );
      return {};
    }
  } else {
    //writeJson(filePath, {
    //  invoiceDrafts: {},
    //});
    return {};
  }
};

export const setDraftToEdit = draft => async dispatch => {
  dispatch({
    type: TYPE.SET_DRAFT_TO_EDIT,
    payload: draft,
  });
};

export const removeDraftToEdit = () => async dispatch => {
  dispatch({
    type: TYPE.REMOVE_DRAFT_TO_EDIT,
    payload: null,
  });
};

export const loadInvoiceDrafts = invoices => {
  return {
    type: TYPE.LOAD_INVOICE_DRAFTS,
    payload: invoices,
  };
};

export const addNewDraft = draft => async (dispatch, getState) => {
  const results = dispatch({
    type: TYPE.ADD_NEW_INVOICE_DRAFT,
    payload: getState().form['InvoiceForm'].values,
  });
};

//not currently used
export const updateDraft = (name, contact) => async dispatch => {
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
