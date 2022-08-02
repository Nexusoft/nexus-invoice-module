import { Panel } from 'nexus-module';
import { useSelector } from 'react-redux';

import Filters from './Filters';
import InvoicesTable from './InvoicesTable';

export default function Main() {
  const loggedIn = useSelector((state) => !!state.nexus.userStatus?.genesis);
  return (
    <Panel title={'Invoices'} icon={{ url: 'icons/invoice.svg', id: 'icon' }}>
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
