import {
  setInvoiceReferenceQuery,
  setInvoiceStatusFilter,
  setInvoiceTimeFilter,
  setInvoiceDescriptionFilter,
  setInvoicePastDueFilter,
  setInvoicePayableFilter,
  setInvoiceRecipientFilter,
} from 'lib/ui';
import { createModal } from 'actions/actionCreators';

const {
  libraries: {
    React,
    ReactRedux: { useSelector, useDispatch },
    emotion: { styled },
  },
  components: { Switch, Select, TextField, FormField, Icon, Button, Arrow },
} = NEXUS;

const __ = (input) => input;

const operations = ['OUTSTANDING', 'PAID', 'REJECTED', 'DRAFT'];

const opOptions = [
  {
    value: null,
    display: __('All'),
  },
  ...operations.map((op) => ({
    value: op,
    display: op,
  })),
];

const timeFrames = [
  {
    value: null,
    display: __('All'),
  },
  {
    value: 'year',
    display: __('Past Year'),
  },
  {
    value: 'month',
    display: __('Past Month'),
  },
  {
    value: 'week',
    display: __('Past Week'),
  },
];

const FiltersWrapper = styled.div({
  gridArea: 'filters',
  display: 'grid',
  gridTemplateAreas: '"reference timeFrame operation"',
  gridTemplateColumns: '3fr 2fr 150px auto',
  gridRowStart: 1,
  gridRowEnd: 1,
  columnGap: '.75em',
  alignItems: 'end',
  fontSize: 15,
  padding: `0 0 10px 0`,
});

const MoreOptions = styled.div({
  paddingLeft: '1em',
  display: 'grid',
  gridTemplateColumns: 'auto auto auto auto',
  gridRowStart: 2,
  gridColumnStart: 1,
  gridColumnEnd: 4,
  columnGap: '.75em',
  alignItems: 'end',
});

const OptionsArrow = styled.span({
  display: 'inline-block',
  width: 15,
  verticalAlign: 'middle',
});

export default function Filters({}) {
  const {
    referenceQuery,
    status,
    timeSpan,
    descriptionQuery,
    pastDue,
    payableQuery,
    recipientQuery,
  } = useSelector((state) => state.ui.invoices);
  const [optionsOpen, setOptionsOpen] = React.useState(false);
  const dispatch = useDispatch();

  return (
    <FiltersWrapper>
      <FormField connectLabel label={__('Reference')}>
        <TextField
          type="search"
          placeholder="Reference Search"
          value={referenceQuery}
          onChange={(evt) =>
            dispatch(setInvoiceReferenceQuery(evt.target.value))
          }
        />
      </FormField>

      <FormField label={__('Time span')}>
        <Select
          value={timeSpan}
          onChange={(val) => dispatch(setInvoiceTimeFilter(val))}
          options={timeFrames}
        />
      </FormField>

      <FormField label={__('Status')}>
        <Select
          value={status}
          onChange={(val) => dispatch(setInvoiceStatusFilter(val))}
          options={opOptions}
        />
      </FormField>

      <Button onClick={() => dispatch(createModal('AddEditInvoice'))}>
        <Icon
          icon={{ url: 'icons/plus.svg', id: 'icon' }}
          style={{
            fontSize: '.8em',
            opacity: 0.7,
            overflow: 'visible',
            marginRight: '0.25em',
          }}
        />
        {'   New Invoice'}
      </Button>

      <Button
        onClick={() => {
          setOptionsOpen(!optionsOpen);
        }}
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
            direction={optionsOpen ? 'down' : 'right'}
            height={8}
            width={10}
          />
        </OptionsArrow>
        <span>{__(optionsOpen ? 'Less options' : 'More options')}</span>
      </Button>

      {optionsOpen && (
        <MoreOptions>
          <FormField label={__('Description')}>
            <TextField
              type="search"
              value={descriptionQuery}
              onChange={(evt) =>
                dispatch(setInvoiceDescriptionFilter(evt.target.value))
              }
              placeholder="Description Search"
            />
          </FormField>

          <FormField label={__('Show Only Past Due ')}>
            <Switch
              checked={pastDue}
              onChange={(event) =>
                dispatch(setInvoicePastDueFilter(!!event.target.checked))
              }
            />
          </FormField>

          <FormField label={__('Payable')}>
            <TextField
              value={payableQuery}
              type="search"
              onChange={(evt) =>
                dispatch(setInvoicePayableFilter(evt.target.value))
              }
              placeholder="Search Payable"
            />
          </FormField>
          <FormField label={__('Recipient')}>
            <TextField
              value={recipientQuery}
              onChange={(evt) =>
                dispatch(setInvoiceRecipientFilter(evt.target.value))
              }
              type="search"
              placeholder="Search Recipient"
            />
          </FormField>
        </MoreOptions>
      )}
    </FiltersWrapper>
  );
}
