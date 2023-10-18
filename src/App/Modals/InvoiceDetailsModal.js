//Internal Dependencies
import { connect } from 'react-redux';
import { formatDateTime } from 'gui/intl';

import { loadInvoices } from 'lib/ui';
import { createModal, removeModal } from 'actions/actionCreators';

const {
  libraries: {
    React,
    React: { Component },
    emotion: { styled },
  },
  components: { Modal, Tooltip, Button, Arrow },
  utilities: { confirm, color, secureApiCall },
} = NEXUS;

const __ = (input) => input;

const timeFormatOptions = {
  year: 'numeric',
  month: 'long',
  day: '2-digit',
  hour: '2-digit',
  minute: '2-digit',
  second: '2-digit',
};

const ModalInternal = styled(Modal)({ maxHeight: '90%' });

const Row = styled.div({
  display: 'grid',
  gridTemplateAreas: '"label value"',
  gridTemplateColumns: '1fr 2fr',
  alignItems: 'start',
  columnGap: '1em',
  marginBottom: '.6em',
});

const Label = styled.div(({ theme }) => ({
  gridArea: 'label',
  textAlign: 'right',
  color: theme.mixer(0.875),
}));

const Value = styled.div({
  gridArea: 'value',
  wordBreak: 'break-word',
});

const Field = ({ label, children }) => (
  <Row>
    <Label>{label}</Label>
    <Value>{children}</Value>
  </Row>
);

const CenterValue = styled.div(({ theme }) => ({
  color: theme.mixer(0.875),
  textAlign: 'center',
}));
const LeftBorderDiv = styled.div(({ theme }) => ({
  borderLeft: `1px solid ${theme.primary}`,
  marginTop: '-1em',
  paddingTop: '1em',
  paddingLeft: '2px',
}));

const TableHeader = styled.div(({ theme }) => ({
  display: 'grid',
  gridTemplateColumns: 'auto 8em 5em 10em',
  gridTemplateRows: 'auto',
  gridGap: '1em 1em',
}));

const TableHeaderText = styled(LeftBorderDiv)(
  ({ theme, padding }) => ({
    paddingRight: `${padding}em`,
    marginRight: `-${padding}em`,
    backgroundColor: color.darken(theme.background, 0.75),
    borderBottom: `1px solid ${theme.foreground}`,
  }),
  ({ border }) =>
    border ? { borderLeft: 'none', paddingLeft: '5px', marginLeft: '-4px' } : {}
);

const ItemsContainter = styled.div(({ theme }) => ({
  padding: '1em 0em 0em 0.25em',
  border: `2px solid ${theme.primary}`,
  borderRadius: '5px',
  backgroundColor: color.darken(theme.background, 0.5),
}));
const InvoiceItem = ({
  description,
  unit_amount,
  amount,
  units,
  itemTotal,
}) => (
  <>
    <div>{description}</div>
    <LeftBorderDiv>{amount || unit_amount}</LeftBorderDiv>
    <LeftBorderDiv>{units}</LeftBorderDiv>
    <LeftBorderDiv>{itemTotal}</LeftBorderDiv>
  </>
);

const InvoiceItems = ({ items }) => {
  return (
    <ItemsContainter>
      <TableHeader>
        {' '}
        <TableHeaderText padding={1} border={'none'}>
          {'Description'}
        </TableHeaderText>
        <TableHeaderText padding={2}>{'Unit cost'}</TableHeaderText>
        <TableHeaderText padding={2}>{'Units'}</TableHeaderText>
        <TableHeaderText padding={0}>{'Total'}</TableHeaderText>
        {items.map((e, i) => (
          <InvoiceItem
            key={i}
            description={e.description}
            unit_amount={e.amount || e.unit_amount}
            units={e.units}
            itemTotal={(e.amount || e.unit_amount) * e.units}
          />
        ))}
      </TableHeader>
    </ItemsContainter>
  );
};

const StatusTag = styled.div(
  {
    width: '10em',
    height: '10em',
    position: 'absolute',
    top: '-80px',
    borderRight: '70px solid transparent',
    transform: 'skew(0deg, -45deg)',
    '& > h2': {
      position: 'absolute',
      top: '85px',
      left: '0px',
      mixBlendMode: 'screen',
      transform: 'skew(0deg, 45deg) rotate(-45deg)',
      opacity: 0.7,
    },
  },

  ({ theme, status }) => {
    switch (status) {
      case 'OUTSTANDING':
        return {
          borderBottom: `70px solid ${theme.background}`,
          '& > h2': {
            top: '90px',
            fontSize: '1.25em',
            left: '-15px',
            color: theme.foreground,
          },
        };
      case 'CANCELLED':
        return {
          borderBottom: `70px solid ${theme.danger}`,
          '& > h2': { left: '-5px', color: theme.dangerAccent },
        };
      case 'PAID':
        return {
          borderBottom: `70px solid ${theme.primary}`,
          '& > h2': { left: '35px', color: theme.primaryAccent },
        };
      default:
        return { borderBottom: `70px solid ${theme.background}` };
    }
  }
);

const PastDueText = styled.a(({ theme }) => ({
  color: theme.danger,
}));

const OptionsArrow = styled.span({
  display: 'inline-block',
  width: 15,
  verticalAlign: 'middle',
});

const MoreOpenButton = (moreOpen, moreOpenToggle, children) => (
  <>
    {moreOpen && children}
    <Button
      onClick={moreOpenToggle}
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
        <Arrow direction={moreOpen ? 'down' : 'right'} height={8} width={10} />
      </OptionsArrow>
      <span className="v-align">
        {__(moreOpen ? __('Less Details') : __('More Details'))}
      </span>
    </Button>
  </>
);

//Allow support any addtional key/values that may be attached to the invoice
const AdditionalKeyValues = (addValues) =>
  addValues.map((e, i) => (
    <Field key={i} label={e.key}>
      {e.value}
    </Field>
  ));

class InvoiceDetailsModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      moreOpen: false,
    };
  }

  clickPayNow = async (e) => {
    console.log(this.props.OpenModal);
    this.props.createModal('SelectAccount', { invoice: this.props.invoice });
  };

  clickCancel = async (e) => {
    const result = await confirm({
      question: __('Are you sure you want to cancel this invoice?'),
      note: __(''),
    });

    if (result) {
      const params = {
        address: this.props.invoice.address,
      };

      try {
        const result = await secureApiCall('invoices/cancel/invoice', params);
        if (result) {
          this.props.loadInvoices();
          this.closeModal();
        }
      } catch (error) {
        //show error
        console.error(error);
      }
    }
  };

  isPastDue() {
    const { dueDate } = this.props.invoice;
    if (Date.now() > dueDate) {
      return true;
    } else {
      return false;
    }
  }

  toggleMoreOpen = (e) => {
    this.setState({
      moreOpen: !this.state.moreOpen,
    });
  };

  returnRest(rest) {
    return Object.keys(rest).map((e) => {
      return { key: e, value: rest[e] };
    });
  }

  render() {
    const {
      created,
      json: {
        amount,
        account,
        sender_detail,
        description,
        token,
        items,
        recipient,
        recipient_detail,
        reference,
        status,
        due_date,
        invoiceNumber,
        ...rest
      },
      address,
      paidOn,
    } = this.props.invoice;
    const { isMine, visible, removeModal } = this.props;
    const pastDue = this.isPastDue();
    return (
      <ModalInternal
        visible={visible}
        removeModal={removeModal}
        assignClose={(closeModal) => (this.closeModal = closeModal)}
      >
        <StatusTag status={status}>
          <h2>{status}</h2>
        </StatusTag>
        <Modal.Header>Invoice Details</Modal.Header>
        <Modal.Body style={{ overflowX: 'hidden' }}>
          <Field label={__('Description')}>{description}</Field>
          <Field label={__('Invoice address')}>{address}</Field>
          <Field label={__('Created')}>
            {' '}
            {formatDateTime(created * 1000, timeFormatOptions)}{' '}
          </Field>
          {reference && <Field label={__('Reference')}>{reference}</Field>}
          {invoiceNumber && (
            <Field label={__('Invoice Number')}>{invoiceNumber}</Field>
          )}
          {due_date && (
            <Field label={__('Due Date')}>
              {pastDue ? (
                <Tooltip.Trigger
                  tooltip={__('Warning, Past Due!')}
                  position={'top'}
                >
                  <PastDueText>
                    {formatDateTime(due_date * 1000, timeFormatOptions)}
                  </PastDueText>
                </Tooltip.Trigger>
              ) : (
                formatDateTime(due_date * 1000, timeFormatOptions)
              )}
            </Field>
          )}
          <Field label={__('Account Payable')}>{account}</Field>
          {sender_detail && (
            <Field label={__('Sender details')}>{sender_detail}</Field>
          )}
          <Field label={__('Recipient ID')}>{recipient}</Field>
          {recipient_detail && (
            <Field label={__('Recipient details')}>{recipient_detail}</Field>
          )}
          <Field label={__('Status')}>{status}</Field>
          {paidOn && (
            <Field label={__('Paid On')}>
              {formatDateTime(paidOn, timeFormatOptions)}
            </Field>
          )}
          <Field label={__('Total')}>{`${amount} NXS`}</Field>
          {MoreOpenButton(
            this.state.moreOpen || false,
            this.toggleMoreOpen,
            AdditionalKeyValues(this.returnRest(rest))
          )}
          <CenterValue>{__('Items')}</CenterValue>
          {items && <InvoiceItems items={items} />}
        </Modal.Body>
        <Modal.Footer>
          <div
            className="mt2 flex space-between"
            style={{ marginBottom: '1em' }}
          >
            <Button skin="primary" onClick={() => this.closeModal()}>
              {'Close'}
            </Button>
            {status === 'OUTSTANDING' &&
              (isMine ? (
                <Button skin="primary" onClick={this.clickPayNow}>
                  {'Pay'}
                </Button>
              ) : (
                <Tooltip.Trigger
                  tooltip={__(
                    'Cancel this invoice, preventing the recipient from paying it.'
                  )}
                  position={'top'}
                >
                  <Button skin="danger" onClick={this.clickCancel}>
                    {'Cancel'}
                  </Button>
                </Tooltip.Trigger>
              ))}
            {status === 'Draft' && (
              <Button skin="danger" onClick={this.deleteDraft}>
                {'Delete Draft'}
              </Button>
            )}
          </div>
        </Modal.Footer>
      </ModalInternal>
    );
  }
}
const mapStateToProps = (state) => {
  return { username: state.nexus.userStatus?.username };
};

export default connect(mapStateToProps, {
  loadInvoices,
  createModal,
})(InvoiceDetailsModal);
