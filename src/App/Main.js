import Invoice from './Invoice';

import nexusIcon from 'icon/NXS_coin.svg';

const {
  libraries: {
    React,
    ReactRedux: { connect },
  },
  components: { GlobalStyles, Panel },
} = NEXUS;

@connect(
  (state) => ({
    coreInfo: state.coreInfo,
    loggedIn: !!state.user.username,
  }),
  {}
)
class Main extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {}

  render() {
    const { loggedIn } = this.props;
    return (
      <Panel title={'Invoices'} icon={nexusIcon}>
        <GlobalStyles />
        {loggedIn ? <Invoice /> : <div>Please Log In!</div>}
      </Panel>
    );
  }
}

export default Main;
