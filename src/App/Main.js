import {
  showConnections,
  hideConnections,
  updateInput,
} from 'actions/actionCreators';

const {
  libraries: {
    React,
    ReactRedux: { connect },
    emotion: { styled },
  },
  components: { GlobalStyles, Panel, Switch, Tooltip, TextField, Button },
  utilities: {
    confirm,
    rpcCall,
    onceRpcReturn,
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
  }),
  { showConnections, hideConnections, updateInput }
)
class Main extends React.Component {
  confirmToggle = async () => {
    const { showingConnections, showConnections, hideConnections } = this.props;
    const question = showingConnections
      ? 'Hide number of connections?'
      : 'Show number of connections?';

    const agreed = await confirm({ question });
    if (agreed) {
      if (showingConnections) {
        hideConnections();
      } else {
        showConnections();
      }
    }
  };

  handleChange = e => {
    this.props.updateInput(e.target.value);
  };

  getDifficulty = async () => {
    try {
      const response = await rpcCall('getdifficulty', [[]]);
      showSuccessDialog({
        message: 'Mining difficulty',
        note: JSON.stringify(response, null, 2),
      });
    } catch (err) {
      showErrorDialog({
        message: 'Cannot get difficulty',
      });
    }
  };

  render() {
    const { coreInfo, showingConnections, inputValue } = this.props;
    return (
      <Panel
        title="React Module Example"
        icon={{ url: 'react.svg', id: 'icon' }}
      >
        <GlobalStyles />
        <div>
          This showcases how a Nexus Wallet Modules can interact with the base
          wallet.
        </div>

        <div className="mt2 flex center">
          Show number of connections&nbsp;&nbsp;
          <Tooltip.Trigger
            position="right"
            tooltip="This setting will be remembered even when the wallet is restarted"
          >
            <Switch
              checked={showingConnections}
              onChange={this.confirmToggle}
            />
          </Tooltip.Trigger>
        </div>
        {!!showingConnections && <div>Connections: {coreInfo.connections}</div>}

        <div className="mt2">
          <div>
            This textbox's content will be remembered even when you navigate
            away from this module
          </div>
          <DemoTextField
            value={inputValue}
            onChange={this.handleChange}
            placeholder="Type anything here"
          />
        </div>

        <div className="mt2">
          <Button onClick={this.getDifficulty}>View mining difficulty</Button>
        </div>
      </Panel>
    );
  }
}

export default Main;
