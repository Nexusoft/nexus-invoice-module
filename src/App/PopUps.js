import { removePopUp } from 'actions/actionCreators';
import InvoiceModal from './Invoice/InvoiceModal';
import InvoiceDetailsModal from './Invoice/InvoiceDetailsModal';
import AccountAsk from 'component/AccountAsk';

const {
  libraries: {
    React,
    ReactRedux: { useSelector, useDispatch },
  },
} = NEXUS;

const popUpComponents = {
  Invoice: InvoiceModal,
  InvoiceDetails: InvoiceDetailsModal,
  AccountAsk: AccountAsk,
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
