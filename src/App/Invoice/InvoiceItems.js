// Internal
import InvoiceItem from './InvoiceItem';

const timing = {
  normal: '300ms',
};

const {
  libraries: {
    React,
    ReduxForm: { Field },
    emotion: { styled },
  },
  components: { GlobalStyles, Icon, Tooltip, Button },
} = NEXUS;

const __ = (input) => input;

const RemoveButton = styled.div(({ theme }) => ({
  marginTop: '1.2em',
  cursor: 'pointer',
  width: 'min-content',
  height: '1.3em',
  fontSize: '1.3em',
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

const TableHeader = styled.div(({ theme, error }) => ({
  display: 'grid',
  gridTemplateColumns: 'auto 8em 5em 10em',
  gridTemplateRows: 'auto',
  gridGap: '1em 1em',
  backgroundColor: theme.error,
  transition: `background-color ${timing.normal}, opacity ${timing.normal}`,
}));

/**
 * Recipients Field from the Send Page
 *
 * @class Recipients
 * @extends {React.Component}
 */
class InvoiceItems extends React.Component {
  returnHeader() {
    return (
      <TableHeader error={this.props.meta.error}>
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
    const { fields, change, addInvoiceItem } = this.props;

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
                    ×
                  </RemoveButton>
                </Tooltip.Trigger>
              }
            />
          </div>
        ))}

        <MoreInfo>
          <Button skin="hyperlink" onClick={addInvoiceItem}>
            <PlusIcon
              icon={{ url: 'plus.svg', id: 'icon' }}
              className="space-right"
            />
            <span className="v-align">{__('Add Item')}</span>
          </Button>
        </MoreInfo>
      </>
    );
  }
}
export default InvoiceItems;
