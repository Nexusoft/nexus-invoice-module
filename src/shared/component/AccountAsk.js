import { loadInvoices, ClosePopUp } from 'lib/ui';
const {
  libraries: {
    React,
    React: { Component },
    ReactRedux: { connect },
    emotion: { styled },
  },
  components: { Modal, Select, Button },
  utilities: { confirm, secureApiCall, showErrorDialog, showSuccessDialog },
} = NEXUS;

const ModalInternal = styled(Modal)({
  maxHeight: '90%',
  maxWidth: '90%',
});

class AccountAsk extends Component {
  constructor(props) {
    super(props);
    this.state = {
      account: 'null',
    };
  }

  componentDidMount() {
    this.setState({
      account: this.props.accounts.filter((e) => e.name === 'default')[0]
        .address,
    });
    console.error(this);
  }

  setAccount = (e) => {
    this.setState({
      account: e,
    });
  };

  getAccounts() {
    return this.props.accounts
      .filter((e) => e.token === '0')
      .map((element) => {
        return {
          value: element.address,
          display: `${element.address} (${element.balance} NXS)`,
        };
      });
  }
  calculateTotal = (items) =>
    items.reduce((total, element) => {
      return total + element.units * element.unit_amount;
    }, 0);

  async openConfirm() {
    const total = this.calculateTotal(this.props.invoice.items);
    const account =
      this.props.accounts.filter((e) => e.address === this.state.account)[0] ||
      this.state.account;
    const result = await confirm({
      question: 'Do you want to fulfill this invoice?',
      note: `You are paying ${total} NXS with your ${
        account.name || 'Default'
      } Account`,
    });
    if (result) {
      try {
        const params = {
          address: this.props.invoice.address,
          amount: this.calculateTotal(this.props.invoice.items),
          address_from: account.address,
        };
        const apiResult = await secureApiCall('invoices/pay/invoice', params);
        if (apiResult) {
          this.props.loadInvoices();
          this.props.ClosePopUp();
          showSuccessDialog({ message: 'Invoice Paid' });
        }
      } catch (error) {
        showErrorDialog({
          message: 'Did Not Send',
          note: `${error.code} , ${error.message}`,
        });
      }
    }
  }

  render() {
    return (
      <ModalInternal
        removeModal={this.props.removeModal}
        assignClose={(closeModal) => (this.closeModal = closeModal)}
      >
        <Modal.Header>Select Payment Account</Modal.Header>
        <Modal.Body>
          <Select
            value={this.state.account}
            onChange={this.setAccount}
            options={this.getAccounts()}
          />{' '}
        </Modal.Body>
        <Modal.Footer>
          <div
            className="mt2 flex space-between"
            style={{ marginBottom: '1em' }}
          >
            <Button skin="danger" onClick={() => this.props.ClosePopUp()}>
              {'Cancel'}
            </Button>
            <Button onClick={() => this.openConfirm()}>
              {'Pay with this Account'}
            </Button>
          </div>
        </Modal.Footer>
      </ModalInternal>
    );
  }
}

const mapStateToProps = (state) => {
  return { accounts: state.user.accounts || [], username: state.user.username };
};

export default connect(mapStateToProps, { loadInvoices, ClosePopUp })(
  AccountAsk
);
