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

export const loadInvoiceDrafts = invoices => {
  return {
    type: TYPE.LOAD_INVOICE_DRAFTS,
    payload: invoices,
  };
};

export const addNewDraft = draft => {
  return {
    type: TYPE.ADD_NEW_INVOICE_DRAFT,
    payload: draft,
  };
};

export const updateDraft = (name, contact) => {
  return {
    type: TYPE.UPDATE_INVOICE_DRAFT,
    payload: { name, contact },
  };
  updateStorage(results);
};

export const deleteDraft = name => {
  return {
    type: TYPE.DELETE_INVOICE_DRAFT,
    payload: name,
  };
};
