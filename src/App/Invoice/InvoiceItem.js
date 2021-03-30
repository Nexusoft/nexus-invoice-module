// External

import memoize from 'gui/memoize';

// Internal
import { formatNumber } from 'gui/intl';

const {
  libraries: {
    React,
    React: { Component },
    emotion: { styled },
    ReduxForm: { Field },
  },
  components: { TextField, FormField },
} = NEXUS;

const __ = input => input;

const ItemLine = styled.div({
  display: 'grid',
  gridTemplateColumns: '1em auto 8em 5em 10em',
  gridTemplateRows: 'auto',
  gridGap: '1em 1em',
});

const TotalField = styled(TextField)({
  width: '10em',
  position: 'relative',
  top: '100%',
  marginTop: '-2.25em',
  input: {
    textAlign: 'right',
  },
});

/**
 * Each item in the  invoice
 *
 * @class RecipientField
 * @extends {Component}
 */
class InvoiceItem extends Component {
  /**
   * Component's Renderable JSX
   *
   * @returns
   * @memberof RecipientField
   */
  render() {
    const { input, meta, child } = this.props;
    const total = input.value && input.value.unitPrice * input.value.units;

    return (
      <ItemLine input={input} meta={meta}>
        {' '}
        {child}
        <FormField>
          <Field
            component={TextField.RF}
            name={`${input.name}.description`}
            placeholder="Description"
          />
        </FormField>
        <FormField>
          <Field
            component={TextField.RF}
            name={`${input.name}.unitPrice`}
            type="number"
            placeholder="Unit Costs"
          />
        </FormField>
        <FormField>
          <Field
            component={TextField.RF}
            name={`${input.name}.units`}
            type="number"
            placeholder="Units"
          />
        </FormField>
        <TotalField
          disabled={true}
          value={`${formatNumber(total, 6)} NXS`}
        ></TotalField>
      </ItemLine>
    );
  }
}
export default InvoiceItem;
