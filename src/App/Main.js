import Invoice from './Invoice';
import { ClosePopUp } from 'lib/ui';

const {
  libraries: {
    React,
    ReactRedux: { connect },
    emotion: { styled },
  },
  components: { GlobalStyles, Panel, Switch, Tooltip, TextField, Button },
  utilities: {
    confirm,

    showErrorDialog,
    showSuccessDialog,
  },
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
      <Panel
        title={'Invoices'}
        icon={{ url: 'icons/NXS_coin.svg', id: 'icon' }}
      >
        <GlobalStyles />
        {loggedIn ? <Invoice /> : <div>Please Log In!</div>}
      </Panel>
    );
  }
}

export default Main;
