import { useSelector, useDispatch } from 'react-redux';
import { formatDateTime } from 'gui/intl';
import { loadInvoices, LoadAccounts } from 'lib/ui';
import { createModal } from 'actions/actionCreators';
import { loadInvoiceDrafts, setDraftToEdit } from 'lib/invoiceDrafts';
import memoize from 'gui/memoize';
import { isMyAddress } from 'selectors';
import Table from 'components/Table';

const {
  libraries: {
    React: { useEffect },
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
    accessor: 'json.status',
    width: 100,
  },
  {
    id: 'reference',
    Header: __('Reference'),
    accessor: 'json.reference',
  },
  {
    id: 'address',
    Header: __('Account Payable'),
    accessor: 'json.account',
    width: 240,
  },
  {
    id: 'recipient',
    Header: __('Recipient'),
    accessor: 'json.recipient',
    width: 240,
  },
];

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
        const pastDate = getThresholdDate(timeSpan);
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

const selectDrafts = memoize((invoiceDrafts, username) =>
  Object.keys(invoiceDrafts)
    .map((e) => invoiceDrafts[e])
    .filter(
      (e) => e && (e.draftOwner === undefined || e.draftOwner === username)
    )
);

export default function InvoicesTable() {
  const dispatch = useDispatch();
  const invoices = useSelector((state) => state.invoices);
  const blocks = useSelector((state) => state.nexus.coreInfo?.blocks);
  const {
    referenceQuery,
    status,
    timeSpan,
    descriptionQuery,
    pastDue,
    payableQuery,
    recipientQuery,
  } = useSelector((state) => state.ui.invoices);
  const genesis = useSelector((state) => state.nexus.userStatus?.genesis);
  const username = useSelector((state) => state.nexus.userStatus?.username);
  const accounts = useSelector((state) => state.userAccounts || []);
  const drafts = useSelector((state) =>
    selectDrafts(state.invoiceDrafts, username)
  );
  const tempInvoices = [...invoices, ...drafts];
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

  const openDraftToEdit = (draft) => {
    dispatch(setDraftToEdit(draft));
    dispatch(createModal('AddEditInvoice'));
  };

  useEffect(() => {
    dispatch(LoadAccounts());
    dispatch(loadInvoices());
  }, [blocks]);

  useEffect(() => {
    loadInvoiceDrafts();
  }, [drafts?.length]);

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
                invoice.status === 'DRAFT'
                  ? openDraftToEdit(invoice)
                  : dispatch(
                      createModal('InvoiceDetails', {
                        invoice,
                        isMine: isMyAddress(
                          accounts,
                          genesis,
                          invoice.recipient
                        ),
                      })
                    );
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
