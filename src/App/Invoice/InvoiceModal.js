// External

// Internal Global
import { ClosePopUp } from 'lib/ui';

import InvoiceForm from './InvoiceForm';
import trashIcon from 'icon/trash.svg';

import { addNewDraft, removeDraftToEdit, deleteDraft } from 'lib/invoiceDrafts';

const {
  libraries: {
    React,
    React: { Component },
    ReactRedux: { connect },
  },
  components: { Icon, Modal, Button },
  utilities: { confirm },
} = NEXUS;

const __ = (input) => input;

const DangerButtonStyle = {
  border: 'none',
  boxShadow: 'none',
};

/**
 * The Internal Send Form in the Send Page
 *
 * @class SendForm
 * @extends {Component}
 */
@connect(
  (state) => ({
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
        visible={true}
        removeModal={this.props.removeModal}
        style={{
          width: '90%',
          maxHeight: '90%',
          height: '90%',
          animation: 'none',
        }}
      >
        <Modal.Header>
          <div
            style={{
              display: 'inline',
              left: '0%',
              position: 'absolute',
              top: '0%',
              marginTop: '.25em',
              marginLeft: '.25em',
            }}
          >
            <Button
              skin={'plain'}
              style={DangerButtonStyle}
              onClick={this.props.removeModal}
            >
              ×
            </Button>
          </div>
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
                style={DangerButtonStyle}
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
