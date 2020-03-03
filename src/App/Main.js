import Invoice from './Invoice';
import { ClosePopUp } from 'lib/ui';
import { SetUserName } from 'lib/user';

import nexusIcon from 'icon/NXS_coin.svg';

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
  state => ({
    coreInfo: state.coreInfo,
  }),
  { SetUserName }
)
class Main extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.SetUserName();
  }

  render() {
    return (
      <Panel title="Invoices" icon={nexusIcon}>
        <GlobalStyles />
        <Invoice />
      </Panel>
    );
  }
}

export default Main;
