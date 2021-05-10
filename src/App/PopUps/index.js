import { removePopUp } from 'actions/actionCreators';
import AddEditInvoiceModal from './AddEditInvoiceModal';
import InvoiceDetailsModal from './InvoiceDetailsModal';
import SelectAccountModal from './SelectAccountModal';

const {
  libraries: {
    React,
    ReactRedux: { useSelector, useDispatch },
  },
} = NEXUS;

const popUpComponents = {
  AddEditInvoice: AddEditInvoiceModal,
  InvoiceDetails: InvoiceDetailsModal,
  SelectAccount: SelectAccountModal,
};

export default function PopUps() {
  const popUps = useSelector((state) => state.popUps);
  const dispatch = useDispatch();

  return popUps?.map(({ id, name, props }) => {
    const PopUp = popUpComponents[name];
    return (
      !!PopUp && (
        <PopUp
          key={id}
          visible={true}
          removeModal={() => dispatch(removePopUp(id))}
          {...props}
        />
      )
    );
  });
}
