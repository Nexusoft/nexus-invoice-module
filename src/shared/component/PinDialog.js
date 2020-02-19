import { removeModal } from 'lib/ui';

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
    GlobalStyles,
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
  utilities: { confirm, color, apiCall, showErrorDialog, showSuccessDialog },
} = NEXUS;

const __ = input => input;

const PinInput = styled.input({
  margin: '1em auto 2.5em',
  fontSize: 18,
});

const formOptions = {
  form: 'pin',
  destroyOnUnmount: true,
  initialValues: {
    pin: '',
  },
  validate: ({ pin }) => {
    const errors = {};
    if (!pin || pin.length < 4) {
      errors.pin = __('Pin must be at least 4 characters');
    }
    return errors;
  },
  onSubmit: ({ pin }, dispatch, props) => {
    if (props.submitPin) {
      props.submitPin(pin);
    }
    removeModal(props.modalId);
  },
};

const PinDialog = ({ handleSubmit, confirmLabel = __('Confirm'), onClose }) => (
  <Modal style={{ maxWidth: 350 }} onClose={onClose}>
    {closeModal => (
      <>
        <Modal.Header>{__('Enter PIN')}</Modal.Header>
        <Modal.Body>
          <form onSubmit={handleSubmit}>
            <Field
              component={PinInput}
              maskable
              name="pin"
              autoFocus
              skin="filled-inverted"
              placeholder={__('Your PIN')}
            />
            <div className="flex space-between">
              <Button onClick={closeModal}>{__('Cancel')}</Button>
              <Button type="submit" skin="primary">
                {confirmLabel}
              </Button>
            </div>
          </form>
        </Modal.Body>
      </>
    )}
  </Modal>
);

export default reduxForm(formOptions)(PinDialog);
