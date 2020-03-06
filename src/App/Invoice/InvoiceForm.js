import { loadInvoices, ClosePopUp } from 'lib/ui';
import { errorHandler } from 'gui/form';

import InvoiceItems from './InvoiceItems';
import { formatNumber } from 'gui/intl';

import {
  getAccountOptions,
  getAddressNameMap,
  getRegisteredFieldNames,
  getAccountInfo,
  getRecipientSuggestions,
} from './selectors';

import { addNewDraft, removeDraftToEdit, deleteDraft } from 'lib/invoiceDrafts';

const {
  libraries: {
    React,
    React: { Component },
    ReactRedux: { connect },
    emotion: { styled },
    ReduxForm: {
      reduxForm,
      Field,
      FieldArray,
      formValueSelector,
      getFormValues,
      reset,
    },
  },
  components: {
    Icon,
    Panel,
    AutoSuggest,
    FieldSet,
    Switch,
    Modal,
    Tooltip,
    Select,
    DateTime,
    TextField,
    FormField,
    Button,
  },
  utilities: {
    confirm,
    color,
    apiCall,
    secureApiCall,
    showErrorDialog,
    showSuccessDialog,
    updateStorage,
  },
} = NEXUS;

const __ = input => input;

const formInitialValues = {
  invoiceDescription: '',
  invoiceNumber: 0,
  invoiceReference: '',
  invoiceDueDate: '',
  sendFrom: '',
  sendDetail: '',
  recipientAddress: '',
  recipientDetail: '',
  items: [{ description: '', units: 1, unitPrice: 0 }],
};

const mapStateToProps = state => {
  const valueSelector = formValueSelector('InvoiceForm');
  return {
    username: state.user.username,
    accountOptions: getAccountOptions(state.user.accounts),
    items: valueSelector(state, 'items') || [],
    initialValues: state.ui.draftEdit || formInitialValues,
  };
};

const FormComponent = styled.form({});

const SectionBase = styled(FieldSet)(({ theme }) => ({
  padding: '0em 1em 1em 1em',
  margin: '0.25em 0 0.25em 0',
  border: `1px solid ${theme.primary}`,
  borderRadius: '5px',
  background: theme.mixer(0.1),

  '& > legend': {
    backgroundColor: color.darken(theme.background, 0.3),
    border: `1px solid ${theme.primary}`,
    borderRadius: '5px',
  },
}));

const ToSection = styled(SectionBase)({
  marginLeft: '.25em',
  flex: '1',
});

const FromSection = styled(SectionBase)({
  flex: '0 0 50%',
  marginRight: '.25em',
});

const ItemListSection = styled(SectionBase)({});

const InvoiceDataSection = styled(SectionBase)({});

const Footer = styled.div({
  marginTop: '1em',
});

@connect(
  state => ({
    suggestions: getRecipientSuggestions(
      state.addressBook,
      state.user.accounts
    ),
  }),
  {}
)
class RecipientField extends Component {
  handleSelect = element => {
    this.props.change(this.props.input.name, element);
  };

  render() {
    const { input, meta, suggestions } = this.props;
    console.error(suggestions);
    return (
      <AutoSuggest.RF
        input={input}
        meta={meta}
        onSelect={this.handleSelect}
        inputProps={{
          placeholder: __('Recipient Genesis/UserName'),
        }}
        suggestions={suggestions}
      />
    );
  }
}

@connect(mapStateToProps, {
  addNewDraft,
  removeDraftToEdit,
  deleteDraft,
  ClosePopUp,
})
@reduxForm({
  form: 'InvoiceForm',
  destroyOnUnmount: true,

  validate: values => {
    const errors = {};
    const {
      invoiceDescription,
      invoiceNumber,
      invoiceReference,
      invoiceDueDate,
      sendFrom,
      sendDetail,
      recipientAddress,
      recipientDetail,
      items,
    } = values;
    if (!invoiceDescription)
      errors.invoiceDescription = __('Description Needed');
    if (!invoiceNumber || isNaN(invoiceNumber))
      errors.invoiceNumber = __('Invalid Number');
    if (!invoiceReference) errors.invoiceReference = __('Reference Needed');
    if (!sendFrom) errors.sendFrom = __('Account Payable Needed');
    if (!recipientAddress) errors.recipientAddress = __('Address Needed');
    if (items && items.length == 0) errors.items = __('Items Needed');
    console.log(errors);
    return errors;
  },
  onSubmit: async (
    {
      invoiceDescription,
      invoiceNumber,
      invoiceDueDate,
      invoiceReference,
      sendFrom,
      sendDetail,
      recipientAddress,
      recipientDetail,
      items,
    },
    dispatch,
    props
  ) => {
    const creationDate = Date.now();
    const dueDate = new Date(invoiceDueDate).getTime() / 1000;
    const convertedItems = items.map(e => {
      return {
        description: e.description,
        units: e.units,
        unit_amount: e.unitPrice,
      };
    });

    const pin = '1234'; //await confirmPin('Pin', props.OpenPopUp);
    const isSendAddress = await apiCall('system/validate/address', {
      address: sendFrom,
    });
    if (pin) {
      const params = {
        extra_field: 'Extra',
        reference: invoiceReference,
        description: invoiceDescription,
        contact: 'foo@bar.com',
        items: convertedItems,
      };
      isSendAddress.is_valid
        ? (params.account = sendFrom)
        : (params.account_name = `${props.username}:${sendFrom}`);
      if (recipientAddress.startsWith('a') && recipientAddress.length === 64) {
        params.recipient = recipientAddress;
      } else {
        params.recipient_username = recipientAddress;
      }
      if (invoiceNumber) params.number = invoiceNumber;
      if (invoiceDueDate) params.due_date = dueDate;
      if (sendDetail) params.sender_detail = sendDetail;
      if (recipientDetail) params.recipient_detail = recipientDetail;
      console.log(params);
      //const asd = await apiCall('invoices/create/invoice', params);
      //console.log(asd);
      const ddd = await secureApiCall('invoices/create/invoice', params);
      console.log(ddd);
      console.error(props);
      return ddd;
    }
  },
  onSubmitSuccess: (result, dispatch, props) => {
    console.error(result);
    if (!result) return;
    props.deleteDraft(props.values.draftTimeStamp);
    showSuccessDialog({ message: 'Invoice Sent', note: 'Pass' });
    loadInvoices();
    dispatch(reset('InvoiceForm'));
    props.ClosePopUp();
  },
  onSubmitFail: errorHandler(__('Error sending NXS')),
})
class InvoiceForm extends Component {
  gatherTotal() {
    return this.props.items.reduce((total, element) => {
      return total + element.units * element.unitPrice;
    }, 0);
  }
  /**
   * Add Recipient to the queue
   *
   * @memberof SendForm
   */
  addInvoiceItem = () => {
    console.log('Add Item');
    this.props.array.push('items', {
      description: '',
      units: 1,
      unitPrice: 0,
    });
  };

  /**
   * Return JSX for the Add Recipient Button
   *
   * @memberof SendForm
   */
  renderAddItemButton = ({ fields }) => (
    <Button onClick={this.addInvoiceItem}>{__('Add Item')}</Button>
  );

  saveAsDraft() {
    console.error(this.props);
    this.props.addNewDraft(null);
    this.props.reset('InvoiceForm');
    this.props.removeModal();
  }

  removeDraft = async () => {
    const result = await confirm({
      question: __('Do you want to delete this draft invoice?'),
      note: __('This can not be undone'),
    });
    if (result) {
      this.props.deleteDraft();
      this.props.reset('InvoiceForm');
      this.props.removeModal();
    }
  };

  render() {
    const { accountOptions, change, handleSubmit, submitting } = this.props;
    return (
      <FormComponent onSubmit={handleSubmit}>
        <InvoiceDataSection legend={__('Details')}>
          <FormField label={__('Description')}>
            <Field
              component={TextField.RF}
              props={{ multiline: true, rows: 1 }}
              name="invoiceDescription"
              placeholder="Description"
            />
          </FormField>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'auto auto auto',
              gridTemplateRows: 'auto',
              gridGap: '1em 1em',
            }}
          >
            <FormField label={__('Reference')}>
              <Field
                component={TextField.RF}
                name="invoiceReference"
                placeholder="Reference"
              />
            </FormField>
            <FormField label={__('Number')}>
              <Field
                component={TextField.RF}
                name="invoiceNumber"
                placeholder="Number"
              />
            </FormField>
            <FormField label={__('Due Date')}>
              <Field
                component={DateTime.RF}
                time={false}
                name="invoiceDueDate"
              />
            </FormField>
          </div>
        </InvoiceDataSection>
        <div style={{ display: 'flex' }}>
          <FromSection legend={__('From')}>
            <FormField label={__('Account Payable')}>
              <Field
                component={Select.RF}
                name="sendFrom"
                placeholder={__('Select an account')}
                options={accountOptions}
              />
            </FormField>
            <FormField label={__('Sender Details')}>
              <Field
                component={TextField.RF}
                name="sendDetail"
                props={{ multiline: true, rows: 1 }}
                placeholder="Name/Address/phoneNumber etc"
              />
            </FormField>
          </FromSection>
          <ToSection legend={__('To')}>
            <FormField label={__('Recipient')}>
              <Field
                component={RecipientField}
                name="recipientAddress"
                change={change}
                placeholder="Recipient Address"
              />
            </FormField>
            <FormField label={__('Recipient Details')}>
              <Field
                component={TextField.RF}
                name="recipientDetail"
                props={{ multiline: true, rows: 1 }}
                placeholder="Name/Address/phoneNumber etc"
              />
            </FormField>
          </ToSection>
        </div>
        <ItemListSection legend={__('Items')}>
          <FieldArray
            component={InvoiceItems}
            name="items"
            change={change}
            addInvoiceItem={this.addInvoiceItem}
          ></FieldArray>
        </ItemListSection>

        <Footer className="mt3 flex space-between">
          <Button type="submit" skin="primary" disabled={submitting}>
            {__('Submit')}
          </Button>
          <Button
            skin="primary"
            onClick={() => this.saveAsDraft()}
            disabled={submitting}
          >
            {__('Save As Draft')}
          </Button>
          {__(`Total: ${formatNumber(this.gatherTotal(), 6)} NXS`)}
        </Footer>
      </FormComponent>
    );
  }
}

export default InvoiceForm;
