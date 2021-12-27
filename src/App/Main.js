import { useSelector } from 'react-redux';

import Filters from './Filters';
import InvoicesTable from './InvoicesTable';

const {
  libraries: { React },
  components: { GlobalStyles, Panel },
} = NEXUS;

export default function Main() {
  const loggedIn = useSelector((state) => !!state.user.username);
  return (
    <Panel title={'Invoices'} icon={{ url: 'icons/invoice.svg', id: 'icon' }}>
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
