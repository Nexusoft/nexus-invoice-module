import { useSelector, useDispatch } from 'react-redux';
import {
  reduxForm,
  Field,
  FieldArray,
  formValueSelector,
  getFormValues,
  reset,
} from 'redux-form';
import { loadInvoices } from 'lib/ui';
import { errorHandler } from 'gui/form';
import RF from 'components/RF';
import DateTimePicker from 'components/DateTimePicker';

import InvoiceItems from './InvoiceItems';
import { formatNumber } from 'gui/intl';

import {
  getAccountOptions,
  getAddressNameMap,
  getRegisteredFieldNames,
  getAccountInfo,
  getRecipientSuggestions,
} from 'selectors';

import { addNewDraft, deleteDraft } from 'lib/invoiceDrafts';
import { UpdateExchangeRate } from 'lib/ui';

const {
  libraries: {
    React,
    React: { useEffect },
    emotion: { styled },
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

const __ = (input) => input;

const formInitialValues = {
  invoiceDescription: '',
  invoiceNumber: 0,
  invoiceReference: '',
  invoiceDueDate: '',
  sendFrom: '',
  sendDetail: '',
  recipientAddress: '',
  recipientDetail: '',
  items: [],
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

const TotalField = styled.strong(({ theme }) => ({
  color: theme.primary,
}));

function RecipientField({ input, meta, change }) {
  const suggestions = useSelector((state) =>
    getRecipientSuggestions(state.addressBook, state.userAccounts)
  );
  const handleSelect = (element) => {
    change(input.name, element);
  };

  return (
    <AutoSuggest
      inputProps={{
        ...input,
        error: meta.touched && meta.error,
        placeholder: __('Recipient Genesis/UserName'),
      }}
      onSelect={handleSelect}
      suggestions={suggestions}
    />
  );
}

function AddEditInvoiceForm({
  removeModal,
  reset,
  array,
  change,
  handleSubmit,
  submitting,
}) {
  const dispatch = useDispatch();
  const valueSelector = formValueSelector('InvoiceForm');
  const accountOptions = useSelector((state) =>
    getAccountOptions(state.userAccounts)
  );
  const fiatCurrency = useSelector(
    (state) => state.nexus.settings?.fiatCurrency
  );
  const items = useSelector((state) => valueSelector(state, 'items') || []);
  const exchangeRate = useSelector((state) => state.settings.exchangeRate);

  useEffect(() => {
    dispatch(UpdateExchangeRate());
  }, []);

  const saveAsDraft = () => {
    dispatch(addNewDraft(null));
    reset('InvoiceForm');
    removeModal();
  };

  const total = items.reduce(
    (total, element) => total + element.units * element.amount,
    0
  );

  const addInvoiceItem = () => {
    array.push('items', {
      description: '',
      units: 1,
      amount: 0,
    });
  };

  return (
    <FormComponent onSubmit={handleSubmit}>
      <InvoiceDataSection legend={__('Details')}>
        <FormField label={__('Description')}>
          <Field
            component={RF}
            as={TextField}
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
              component={RF}
              as={TextField}
              name="invoiceReference"
              placeholder="Reference"
            />
          </FormField>
          <FormField label={__('Number')}>
            <Field
              component={RF}
              as={TextField}
              name="invoiceNumber"
              placeholder="Number"
            />
          </FormField>
          <FormField label={__('Due Date')}>
            <Field
              component={RF}
              as={DateTimePicker}
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
              component={RF}
              as={Select}
              name="sendFrom"
              placeholder={__('Select an account')}
              options={accountOptions}
            />
          </FormField>
          <FormField label={__('Sender Details')}>
            <Field
              component={RF}
              as={TextField}
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
            />
          </FormField>
          <FormField label={__('Recipient Details')}>
            <Field
              component={RF}
              as={TextField}
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
          validate={(value, allValues, props) => {
            if (value && value.length == 0) return 'Error!';
            return null;
          }}
          name="items"
          change={change}
          addInvoiceItem={addInvoiceItem}
        ></FieldArray>
      </ItemListSection>

      <Footer
        style={{ display: 'grid', gridTemplateColumns: '6em .9fr auto 1fr' }}
      >
        <>
          <Button type="submit" skin="primary" disabled={submitting}>
            {__('Submit')}
          </Button>
          <a
            style={{
              fontWeight: 'bolder',
              fontVariant: 'all-small-caps',
              paddingTop: '.5em',
              paddingLeft: '.5em',
              opacity: '.75',
            }}
          >
            (1 NXS Fee)
          </a>
        </>
        <Button skin="primary" onClick={saveAsDraft} disabled={submitting}>
          {__('Save As Draft')}
        </Button>
        <TotalField style={{ marginLeft: 'auto' }}>
          {__(`Total: ${formatNumber(total, 6)} NXS`)}
          <a style={{ opacity: '.5' }}>{` (${formatNumber(
            total * exchangeRate,
            2
          )} ${fiatCurrency})`}</a>
        </TotalField>
      </Footer>
    </FormComponent>
  );
}

const reduxFormOptions = {
  form: 'InvoiceForm',
  destroyOnUnmount: true,

  validate: (values) => {
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
    if (!sendFrom) errors.sendFrom = __('Account Payable Needed');
    if (!recipientAddress) errors.recipientAddress = __('Recipient Needed');
    if (items && items.length == 0) errors.items = __('Items Needed');
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
    const dueDate = new Date(invoiceDueDate).getTime() / 1000;
    const convertedItems = items.map((e) => {
      return {
        description: e.description,
        units: e.units,
        amount: e.amount,
      };
    });

    const params = {
      items: convertedItems,
      recipient: recipientAddress, // invoice's recipient
      to: sendFrom, // account that will receive the payment
    };

    if (invoiceReference) params.reference = invoiceReference;
    if (invoiceDescription) params.description = invoiceDescription;
    if (invoiceNumber) params.number = invoiceNumber;
    if (invoiceDueDate) params.due_date = dueDate;
    if (sendDetail) params.sender_detail = sendDetail;
    if (recipientDetail) params.recipient_detail = recipientDetail;
    return await secureApiCall('invoices/create/invoice', params);
  },
  onSubmitSuccess: (result, dispatch, props) => {
    console.error(result);
    if (!result) return;
    dispatch(deleteDraft(props.values.draftTimeStamp));
    showSuccessDialog({ message: 'Invoice Sent' });
    loadInvoices();
    dispatch(reset('InvoiceForm'));
    props.removeModal();
  },
  onSubmitFail: errorHandler(__('Error sending NXS')),
};

AddEditInvoiceForm = reduxForm(reduxFormOptions)(AddEditInvoiceForm);

export default function AddEditInvoiceFormWrapper({ removeModal }) {
  const username = useSelector((state) => state.nexus.userStatus?.username);
  const initialValues = useSelector(
    (state) => state.ui.draftEdit || formInitialValues
  );
  return (
    <AddEditInvoiceForm
      username={username}
      initialValues={initialValues}
      removeModal={removeModal}
    />
  );
}
