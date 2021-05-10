import { removeModal } from 'actions/actionCreators';
import AddEditInvoiceModal from './AddEditInvoiceModal';
import InvoiceDetailsModal from './InvoiceDetailsModal';
import SelectAccountModal from './SelectAccountModal';

const {
  libraries: {
    React,
    ReactRedux: { useSelector, useDispatch },
  },
} = NEXUS;

const modalComponents = {
  AddEditInvoice: AddEditInvoiceModal,
  InvoiceDetails: InvoiceDetailsModal,
  SelectAccount: SelectAccountModal,
};

export default function Modals() {
  const modals = useSelector((state) => state.modals);
  const dispatch = useDispatch();

  return modals?.map(({ id, name, props }) => {
    const Modal = modalComponents[name];
    return (
      !!Modal && (
        <Modal
          key={id}
          visible={true}
          removeModal={() => dispatch(removeModal(id))}
          {...props}
        />
      )
    );
  });
}
