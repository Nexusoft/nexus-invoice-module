import * as TYPE from 'actions/types';

const initialState = {
  referenceQuery: '',
  status: null,
  timeSpan: null,
  descriptionQuery: '',
  pastDue: false,
  payableQuery: '',
  recipientQuery: '',
};

export default (state = initialState, action) => {
  switch (action.type) {
    case TYPE.INITIALIZE: {
      const { moduleState } = action.payload;
      return (moduleState && moduleState.ui.invoices) || initialState;
    }
    case TYPE.SET_INVOICE_REFERENCE_FILTER:
      return {
        ...state,
        referenceQuery: action.payload,
      };

    case TYPE.SET_INVOICE_STATUS_FILTER:
      return {
        ...state,
        status: action.payload,
      };

    case TYPE.SET_INVOICE_TIME_FILTER:
      return {
        ...state,
        timeSpan: action.payload,
      };

    case TYPE.SET_INVOICE_DESCRIPTION_FILTER:
      return {
        ...state,
        descriptionQuery: action.payload,
      };
    case TYPE.SET_INVOICE_PAST_DUE_FILTER:
      return {
        ...state,
        pastDue: action.payload,
      };
    case TYPE.SET_INVOICE_PAYABLE_FILTER:
      return {
        ...state,
        payableQuery: action.payload,
      };
    case TYPE.SET_INVOICE_RECEIPANT_FILTER:
      return {
        ...state,
        recipientQuery: action.payload,
      };

    default:
      return state;
  }
};
