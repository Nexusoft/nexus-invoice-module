// External

// Internal Global
import { loadInvoices, ClosePopUp } from 'lib/ui';
import { errorHandler } from 'gui/form';

import InvoiceItems from './InvoiceItems';
import { formatNumber } from 'gui/intl';
import trashIcon from 'icon/trash.svg';

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

// React-Redux mandatory methods
const mapStateToProps = state => {
  const valueSelector = null;
  return {
    ...state.core,
    suggestions: getRecipientSuggestions(
      state.addressBook,
      state.user.accounts
    ),
    username: state.user.username,
    accountOptions: getAccountOptions(state.user.accounts),
    copy: {},
    items: [],
    drafts: state.invoiceDrafts,
    draftToEditBool: !!state.ui.draftEdit,
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

class RecipientField extends Component {
  handleSelect = element => {
    this.props.change(this.props.input.name, element);
  };

  render() {
    const { input, meta, suggestions } = this.props;
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
    return null;
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
class InvoiceFormBody extends Component {
  gatherTotal() {
    return 5;
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

  render() {
    const {
      accountOptions,
      change,
      handleSubmit,
      submitting,
      suggestions,
    } = this.props;
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
              <Field component={DateTime.RF} name="invoiceDueDate" />
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
                suggestions={suggestions}
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

/**
 * The Internal Send Form in the Send Page
 *
 * @class SendForm
 * @extends {Component}
 */
@connect(
  state => ({
    draftToEditBool: !!state.ui.draftEdit,
  }),
  {
    addNewDraft,
    removeDraftToEdit,
    deleteDraft,
    ClosePopUp,
  }
)
class InvoiceForm extends Component {
  componentDidMount() {
    // loadAccounts();
    console.log(this.props.draftToEditBool);
    if (this.props.draftToEditBool) {
      this.props.removeDraftToEdit();
    }
  }

  componentDidUpdate(prevProps, prevState) {
    console.error(prevProps);
    console.error(this.props);
  }

  saveAsDraft() {
    console.error(this.props);
    this.props.addNewDraft(this.props.copy);
    this.props.reset('InvoiceForm');
    updateStorage(this.props.drafts);
    this.props.removeModal();
  }

  removeDraft = async () => {
    const result = await confirm({
      question: __('Do you want to delete this draft invoice?'),
      note: __('This can not be undone'),
    });
    if (result) {
      this.props.deleteDraft(this.props.copy.draftTimeStamp);
      this.props.reset('InvoiceForm');
      updateStorage(this.props.drafts);
      this.props.removeModal();
    }
  };

  render() {
    const {
      accountOptions,
      change,
      handleSubmit,
      submitting,
      suggestions,
    } = this.props;
    const isDraft = this.props.copy && this.props.copy.draftTimeStamp;
    return (
      <Modal
        removeModal={this.props.removeModal}
        style={{
          width: '90%',
          maxHeight: '90%',
          height: '90%',
        }}
      >
        <Modal.Header>
          {isDraft ? 'Edit Draft Invoice' : 'New Invoice'}{' '}
          {isDraft && (
            <div
              style={{
                display: 'inline',
                right: '0%',
                position: 'absolute',
                top: '0%',
                marginTop: '.25em',
              }}
            >
              <Button
                square
                skin={'plain'}
                onClick={() => {
                  this.removeDraft();
                }}
              >
                {' '}
                <Icon
                  icon={trashIcon}
                  style={{
                    fontSize: '.8em',
                    opacity: 0.7,
                    overflow: 'visible',
                    marginRight: '0.25em',
                  }}
                />
              </Button>
            </div>
          )}
        </Modal.Header>

        <Modal.Body>
          <InvoiceFormBody />
        </Modal.Body>
      </Modal>
    );
  }
}

export default InvoiceForm;
