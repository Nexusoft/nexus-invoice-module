// Internal
import plusIcon from 'icon/plus.svg';
import InvoiceItem from './invoiceItem';

const timing = {
  normal: '300ms',
};

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
    Table,
    Panel,
    AutoSuggest,
    FieldSet,
    Switch,
    Tooltip,
    Select,
    TextField,
    FormField,
    Button,
  },
  utilities: {
    confirm,
    rpcCall,
    onceRpcReturn,
    showErrorDialog,
    showSuccessDialog,
    calc: { subtract },
  },
} = NEXUS;

__ = __context('Invoice Item List');

const RemoveButton = styled.div(({ theme }) => ({
  left: `0.75em`,
  marginTop: '1.5em',
  cursor: 'pointer',
  width: '1.5em',
  height: '1.5em',
  fontSize: '1em',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  color: theme.mixer(0.75),
  opacity: 1,
  transition: `color ${timing.normal}, opacity ${timing.normal}`,
  '&:hover': {
    color: theme.mixer(0.875),
  },
}));

const MoreInfo = styled.div({
  marginTop: '1em',
  marginBottom: '1.5em',
  display: 'flex',
  justifyContent: 'space-between',
});

const PlusIcon = styled(Icon)({
  fontSize: '.8em',
});

const TableHeader = styled.div({
  display: 'grid',
  gridTemplateColumns: 'auto 8em 5em 10em',
  gridTemplateRows: 'auto',
  gridGap: '1em 1em',
});

/**
 * Recipients Field from the Send Page
 *
 * @class Recipients
 * @extends {React.Component}
 */
class InvoiceItems extends React.Component {
  returnHeader() {
    return (
      <TableHeader>
        <div style={{ width: '5em', textAlign: 'center' }}>
          {__('Description')}
        </div>
        <div style={{ textAlign: 'center' }}>{__('Unit Cost')}</div>
        <div style={{ textAlign: 'center' }}>{__('Units')}</div>
        <div style={{ textAlign: 'center' }}>{__('Total')}</div>
      </TableHeader>
    );
  }

  /**
   * Component's Renderable JSX
   *
   * @returns
   * @memberof Recipients
   */
  render() {
    const { fields, change, addInvoiceItem, accBalance } = this.props;

    if (!fields) return null;

    return (
      <>
        {this.returnHeader()}
        {fields.map((fieldName, i) => (
          <div key={i}>
            <Field
              name={`items[${i}]`}
              component={InvoiceItem}
              change={change}
              child={
                <Tooltip.Trigger tooltip={__('Remove Item')}>
                  <RemoveButton
                    onClick={() => {
                      fields.remove(i);
                    }}
                  >
                    ✕
                  </RemoveButton>
                </Tooltip.Trigger>
              }
            />
          </div>
        ))}

        <MoreInfo>
          <Button skin="hyperlink" onClick={addInvoiceItem}>
            <PlusIcon icon={plusIcon} className="space-right" />
            <span className="v-align">{__('Add Item')}</span>
          </Button>
        </MoreInfo>
      </>
    );
  }
}
export default InvoiceItems;
