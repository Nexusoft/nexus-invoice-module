import {
  showConnections,
  hideConnections,
  updateInput,
} from 'actions/actionCreators';
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

const DemoTextField = styled(TextField)({
  maxWidth: 400,
});

@connect(
  state => ({
    coreInfo: state.coreInfo,
    showingConnections: state.settings.showingConnections,
    inputValue: state.ui.inputValue,
    PopUp: state.popUps,
  }),
  { showConnections, hideConnections, updateInput, ClosePopUp, SetUserName }
)
class Main extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.SetUserName();
  }

  render() {
    const { PopUp } = this.props;
    return (
      <Panel title="Invoices" icon={nexusIcon}>
        <GlobalStyles />
        <Invoice />
        {PopUp ? (
          <PopUp.div
            {...PopUp.props}
            removeModal={() => this.props.ClosePopUp()}
          />
        ) : null}
      </Panel>
    );
  }
}

export default Main;
