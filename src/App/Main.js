import Filters from './Filters';
import InvoicesTable from './InvoicesTable';

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
    <Panel title={'Invoices'} icon={{ url: 'icons/NXS_coin.svg', id: 'icon' }}>
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
