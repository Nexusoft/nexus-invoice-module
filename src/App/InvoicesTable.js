// External Dependencies
import { formatDateTime } from 'gui/intl';

// Internal Global Dependencies
import { loadInvoices, OpenPopUp, LoadAccounts } from 'lib/ui';
import { createPopUp } from 'actions/actionCreators';

//Invoice

import {
  loadInvoiceDrafts,
  addNewDraft,
  setDraftToEdit,
} from 'lib/invoiceDrafts';
import memoize from 'gui/memoize';
import { isMyAddress } from 'selectors';

import Table from 'component/Table';

const {
  libraries: {
    React,
    React: { Component },
    ReactRedux: { connect },
    emotion: { styled },
  },
} = NEXUS;

const __ = (input) => input;

const timeFormatOptions = {
  year: 'numeric',
  month: 'short',
  day: '2-digit',
  hour: '2-digit',
  minute: '2-digit',
  second: '2-digit',
  hour12: false,
};

const ItalicText = styled.a({
  fontStyle: 'italic',
});

const getThresholdDate = (timeSpan) => {
  const now = new Date();
  switch (timeSpan) {
    case 'week':
      return new Date(now.getFullYear(), now.getMonth(), now.getDate() - 7);
    case 'month':
      return new Date(now.getFullYear(), now.getMonth() - 1, now.getDate());
    case 'year':
      return new Date(now.getFullYear() - 1, now.getMonth(), now.getDate());
    default:
      return null;
  }
};

const tableColumns = [
  {
    id: 'created',
    Header: __('Time'),
    accessor: 'created',
    Cell: (cell) => {
      const timeValue = cell.value
        ? formatDateTime(cell.value * 1000, timeFormatOptions)
        : '';
      if (cell.original.status === 'DRAFT') {
        return <ItalicText>{timeValue}</ItalicText>;
      }
      return timeValue;
    },
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
    Header: __('Recipient'),
    accessor: 'recipient',
    width: 240,
  },
];

const invoices = [];

const memorizedFilters = memoize(
  (
    invoiceList,
    referenceQuery,
    timeSpan,
    status,
    descriptionQuery,
    pastDue,
    payableQuery,
    recipientQuery
  ) =>
    invoiceList &&
    invoiceList.filter((element) => {
      if (referenceQuery) {
        if (
          element.reference &&
          !element.reference
            .toLowerCase()
            .includes(referenceQuery.toLowerCase())
        )
          return false;
        if (!element.reference) return false;
      }
      if (status && element.status && element.status !== status) return false;
      if (timeSpan) {
        console.log(element);
        const pastDate = getThresholdDate(timeSpan);
        console.log(pastDate);
        if (!pastDate) return true;
        else return element.created * 1000 > pastDate.getTime();
      }
      if (descriptionQuery) {
        if (
          element.description &&
          !element.description
            .toLowerCase()
            .includes(descriptionQuery.toLowerCase())
        )
          return false;
        if (!element.description) return false;
      }
      if (pastDue) {
        if (element.past_due) {
          return element.past_due * 1000 < pastDate.getTime();
        } else {
          return false;
        }
      }
      if (payableQuery) {
        if (element.account) {
          if (!element.account.includes(payableQuery)) {
            return false;
          }
        }
      }
      if (recipientQuery) {
        if (element.recipient) {
          !element.recipient.includes(recipientQuery);
          {
            return false;
          }
        }
      }
      return true;
    })
);

// React-Redux mandatory methods
const mapStateToProps = (state) => {
  return {
    invoiceCore: state.invoices,
    blocks: state.coreInfo.blocks,
    invoicesUI: state.ui.invoices,
    genesis: state.user.genesis,
    username: state.user.username,
    accounts: state.accounts || [],
    drafts: state.invoiceDrafts,
  };
};

@connect(mapStateToProps, {
  createPopUp,
  OpenPopUp,
  LoadAccounts,
  addNewDraft,
  loadInvoices,
  setDraftToEdit,
})
/**
 * Invoice Page
 *
 * @class Invoice
 * @extends {Component}
 */
class InvoicesTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      optionsOpen: false,
    };
  }

  // React Method (Life cycle hook)
  componentDidMount() {
    this.props.LoadAccounts();
    this.props.loadInvoices();
    loadInvoiceDrafts();
    setInterval(this.updateInvoice.bind(this), 5000);
  }

  updateInvoice() {
    this.props.loadInvoices();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.drafts.length != this.props.drafts.length) {
      loadInvoiceDrafts();
    }

    if (prevProps.blocks != this.props.blocks) {
      console.log('Updated with blocks');

      this.props.LoadAccounts();
      this.props.loadInvoices();
    }
  }

  returnDrafts() {
    const { drafts } = this.props;
    return Object.keys(drafts)
      .map((e) => {
        return drafts[e];
      })
      .filter(
        (e) =>
          e &&
          (e.draftOwner === undefined || e.draftOwner === this.props.username)
      );
  }

  openDraftToEdit = (draft) => {
    this.props.setDraftToEdit(draft);
    this.props.createPopUp('Invoice');
  };

  render() {
    const {
      referenceQuery,
      status,
      timeSpan,
      descriptionQuery,
      pastDue,
      payableQuery,
      recipientQuery,
    } = this.props.invoicesUI;
    const { accounts, genesis } = this.props;
    const drafts = this.returnDrafts();
    const tempInvoices = [...invoices, ...this.props.invoiceCore, ...drafts];
    const filteredInvoices = memorizedFilters(
      tempInvoices,
      referenceQuery,
      timeSpan,
      status,
      descriptionQuery,
      pastDue,
      payableQuery,
      recipientQuery
    );
    return (
      <Table
        data={filteredInvoices}
        columns={tableColumns}
        defaultPageSize={10}
        defaultSortingColumnIndex={0}
        getTrProps={(state, row) => {
          const invoice = row && row.original;
          return {
            onClick: invoice
              ? () => {
                  console.log(invoice);
                  invoice.status === 'DRAFT'
                    ? this.openDraftToEdit(invoice)
                    : this.props.createPopUp('InvoiceDetails', {
                        invoice,
                        isMine: isMyAddress(
                          accounts,
                          genesis,
                          invoice.recipient
                        ),
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
    );
  }
}

// Mandatory React-Redux method
export default InvoicesTable;
