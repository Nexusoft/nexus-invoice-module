import Filters from './Filters';
import InvoicesTable from './InvoicesTable';

import nexusIcon from 'icon/NXS_coin.svg';

const {
  libraries: {
    React,
    ReactRedux: { useSelector },
  },
  components: { GlobalStyles, Panel },
} = NEXUS;

export default function Main() {
  const loggedIn = useSelector((state) => !!state.user.username);
  return (
    <Panel title={'Invoices'} icon={nexusIcon}>
      <GlobalStyles />
      {loggedIn ? (
        <>
          <Filters />
          <InvoicesTable />
        </>
      ) : (
        <div>Please Log In!</div>
      )}
    </Panel>
  );
}
