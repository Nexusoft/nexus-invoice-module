import Invoice from './Invoice';

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
      {loggedIn ? <Invoice /> : <div>Please Log In!</div>}
    </Panel>
  );
}
