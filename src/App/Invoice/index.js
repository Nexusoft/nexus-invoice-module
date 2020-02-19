// External Dependencies
import { formatDateTime } from 'gui/intl';

// Internal Global Dependencies
import { loadInvoices, openModal, OpenPopUp, LoadAccounts } from 'lib/ui';

//Invoice
import InvoiceForm from './InvoiceForm';
import Filters from './Filters';
import InvoiceDetailModal from './invoiceDetailsModal';

import plusIcon from 'icon/plus.svg';
import { loadInvoiceDrafts, addNewDraft } from 'lib/invoiceDrafts';
import memoize from 'gui/memoize';
import { isMyAddress } from './selectors';

import Table from 'component/Table';

const {
  libraries: {
    React,
    React: { Component },
    ReactRedux: { connect },
    emotion: { styled },
  },
  components: {
    GlobalStyles,
    Icon,
    Panel,
    Switch,
    Tooltip,
    Select,
    TextField,
    FormField,
    Button,
    Arrow,
  },
  utilities: {
    updateStorage,
    confirm,
    apiCall,
    showErrorDialog,
    showSuccessDialog,
  },
} = NEXUS;

const __ = input => input;

const contractStatus = ['Pending', 'Paid', 'Rejected'];

const Header = styled.div({});

const timeFormatOptions = {
  year: 'numeric',
  month: 'short',
  day: '2-digit',
  hour: '2-digit',
  minute: '2-digit',
  second: '2-digit',
  hour12: false,
};

const tableColumns = [
  {
    id: 'created',
    Header: __('Time'),
    accessor: 'created',
    Cell: cell =>
      cell.value ? formatDateTime(cell.value * 1000, timeFormatOptions) : '',
    width: 180,
  },
  {
    id: 'status',
    Header: __('Status'),
    accessor: 'status',
    width: 100,
  },
  {
    id: 'reference',
    Header: __('Reference'),
    accessor: 'reference',
  },
  {
    id: 'address',
    Header: __('Account Payable'),
    accessor: 'account',
    width: 240,
  },
  {
    id: 'recipient',
    Header: __('Receipiant'),
    accessor: 'recipient',
    width: 240,
  },
];

const InvoiceTable = styled(Table)({});

const invoices = [
  {
    created: '199232403',
    description: 'This is a  test invoice',
    due_date: '199255403',
    reference: 'Test1',
    invoiceNumber: 2,
    address: '8MAF92nNAkk3288Skfn1n44kksn356n2k1',
    recipient:
      'a1537d5c089ebe309887bcf6a9c2e219ca64257922ce91455c2ca86617536a2d',
    recipient_detail: '1111 North Street \n LA California N USA',
    status: 'Pending',
    sender_detail: '1234 Main Street \n Phx Arizona \n USA',
    items: [
      { description: 'Item1', unit_price: '2.0421', units: '4' },
      { description: 'Item2', unit_price: '20', units: '1' },
      { description: 'Item3', unit_price: '1.62342', units: '6' },
      { description: 'Item4', unit_price: '0.1355', units: '19' },
      { description: 'Item5', unit_price: '12', units: '3' },
      { description: 'Item6', unit_price: '5.3', units: '2' },
      { description: 'Item2', unit_price: '20', units: '1' },
      { description: 'Item3', unit_price: '1.62342', units: '6' },
      { description: 'Item4', unit_price: '0.1355', units: '19' },
      { description: 'Item5', unit_price: '12', units: '3' },
      { description: 'Item6', unit_price: '5.3', units: '2' },
    ],
  },
  {
    created: '19925562103',
    reference: 'aTest2',
    address: '8MAF92nNAkk3288Skfn1n44kksn356n2k1',
    recipient: '2kaDJ92n1fj4n85Nj5n38fj28',
    status: 'Rejected',
    items: [{ description: 'Item1', unit_price: '2.0421', units: '4' }],
  },
  {
    created: '1992324203',
    paidOn: '1992334203',
    reference: 'uTest3',
    address: '8MAF92nNAkk3288Skfn1n44kksn356n2k1',
    recipient: '2kaDJ92n1fj4n85Nj5n38fj28',
    status: 'Paid',
    items: [{ description: 'Item1', unit_price: '2.0421', units: '4' }],
  },
  {
    created: '19923240993',
    reference: 'pTest4',
    address: '8MAF92nNAkk3288Skfn1n44kksn356n2k1',
    recipient: '2kaDJ92n1fj4n85Nj5n38fj28',
    status: 'Pending',
    items: [{ description: 'Item1', unit_price: '2.0421', units: '4' }],
  },
];

const memorizedFilters = memoize(
  (invoiceList, referenceQuery, timespan, status) =>
    invoiceList &&
    invoiceList.filter(element => {
      if (
        referenceQuery &&
        element.reference &&
        !element.reference.toLowerCase().includes(referenceQuery.toLowerCase())
      )
        return false;

      if (status && element.status && !element.status === status) return false;
      return true;
    })
);

const OptionsArrow = styled.span({
  display: 'inline-block',
  width: 15,
  verticalAlign: 'middle',
});

// React-Redux mandatory methods
const mapStateToProps = state => {
  //const { userStatus } = state.core;
  const userStatus = 'test';
  const { genesis } = userStatus || { genesis: '' };

  return {
    invoiceCore: state.invoices,
    invoicesUI: state.ui.invoices,
    genesis: genesis,
    accounts: state.accounts || [],
    drafts: state.invoiceDrafts,
  };
};

@connect(mapStateToProps, {
  OpenPopUp,
  LoadAccounts,
  addNewDraft,
  loadInvoices,
})
/**
 * Invoice Page
 *
 * @class Invoice
 * @extends {Component}
 */
class Invoice extends Component {
  constructor(props) {
    super(props);
    this.state = {
      optionsOpen: false,
    };
  }

  // React Method (Life cycle hook)
  componentDidMount() {
    this.test();
    this.props.LoadAccounts();
    this.props.loadInvoices();
    this.props.addNewDraft({
      name: 'test01',
      status: 'TEST',
      created: 199552403,
      items: [{ name: 'item1' }, { name: 'item2' }],
    });
    //updateStorage([...this.props.drafts]);
    loadInvoiceDrafts();
  }

  async test() {
    const aaa = await apiCall('users/list/invoices', {});
    console.log(aaa);
  }

  toggleMoreOptions = e => {
    this.setState({
      optionsOpen: !this.state.optionsOpen,
    });
  };

  returnDrafts() {
    const { drafts } = this.props;
    return Object.keys(drafts).map(e => {
      return drafts[e];
    });
  }

  render() {
    const { referenceQuery, status, timespan } = this.props.invoicesUI;
    const { accounts, genesis } = this.props;
    const drafts = this.returnDrafts();
    const tempInvoicec = [...invoices, ...this.props.invoiceCore, ...drafts];
    //console.log(this.returnDrafts());
    //console.log(Arrow);
    //console.log(tempInvoicec);
    const filteredInvoices = memorizedFilters(
      tempInvoicec,
      referenceQuery,
      timespan,
      status
    );
    return (
      <>
        <Header>
          <Filters optionsOpen={this.state.optionsOpen}>
            <Button
              onClick={
                () => this.props.OpenPopUp(InvoiceForm)
                //this.props.OpenPopUp(<div>{'ASDASD'}</div>)
              }
            >
              <Icon
                icon={plusIcon}
                style={{
                  fontSize: '.8em',
                  opacity: 0.7,
                  overflow: 'visible',
                  marginRight: '0.25em',
                }}
              />
              {'   New Invoice'}
            </Button>
            {
              <Button
                onClick={this.toggleMoreOptions}
                skin="hyperlink"
                style={{
                  width: '12px',
                  height: '10px',
                  gridRowStart: 3,
                  borderBottomStyle: 'none',
                  paddingBottom: '1em',
                }}
              >
                <OptionsArrow>
                  <Arrow
                    direction={this.state.optionsOpen ? 'down' : 'right'}
                    height={8}
                    width={10}
                  />
                </OptionsArrow>
                <span>
                  {__(this.state.optionsOpen ? 'Less options' : 'More options')}
                </span>
              </Button>
            }
          </Filters>
        </Header>
        <InvoiceTable
          data={filteredInvoices}
          columns={tableColumns}
          defaultPageSize={10}
          defaultSortingColumnIndex={0}
          getTrProps={(state, row) => {
            const invoice = row && row.original;
            return {
              onClick: invoice
                ? () => {
                    this.props.OpenPopUp(InvoiceDetailModal, {
                      invoice,
                      isMine: isMyAddress(accounts, genesis, invoice.recipient),
                    });
                    //this.props.OpenPopUp(InvoiceDetailModal);
                  }
                : undefined,
              style: {
                cursor: 'pointer',
                fontSize: 15,
              },
            };
          }}
        />
      </>
    );
  }
}

// Mandatory React-Redux method
export default Invoice;
