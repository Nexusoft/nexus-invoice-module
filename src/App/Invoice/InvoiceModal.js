// External

// Internal Global
import { loadInvoices, ClosePopUp } from 'lib/ui';

import InvoiceForm from './InvoiceForm';
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
class InvoiceModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isDraft: false,
    };
  }
  componentDidMount() {
    // loadAccounts();
    console.log(this.props.draftToEditBool);
    if (this.props.draftToEditBool) {
      this.setState({ isDraft: true });
      this.props.removeDraftToEdit();
    }
  }

  removeDraft = async () => {
    const result = await confirm({
      question: __('Do you want to delete this draft invoice?'),
      note: __('This can not be undone'),
    });
    if (result) {
      this.props.deleteDraft();
      return;
    }
  };

  render() {
    const { isDraft } = this.state;
    return (
      <Modal
        removeModal={this.props.removeModal}
        style={{
          width: '90%',
          maxHeight: '90%',
          height: '90%',
          animation: 'none',
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
          <InvoiceForm removeModal={this.props.removeModal} />
        </Modal.Body>
      </Modal>
    );
  }
}

export default InvoiceModal;
