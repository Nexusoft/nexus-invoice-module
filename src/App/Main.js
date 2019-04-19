import { showVersion, hideVersion, updateInput } from 'actions/actionCreators';

const {
  libraries: {
    React,
    ReactRedux: { connect },
  },
  components: { GlobalStyles, Panel, Switch, Tooltip, TextField },
  ipc: { send, listenOnce },
} = NEXUS;

const newID = (() => {
  let id = 0;
  return () => ++id;
})();

@connect(
  state => ({
    coreInfo: state.coreInfo,
    showingVersion: state.settings.showingVersion,
    inputValue: state.ui.inputValue,
  }),
  { showVersion, hideVersion, updateInput }
)
class Main extends React.Component {
  confirmToggle = () => {
    const { showingVersion, showVersion, hideVersion } = this.props;
    const question = showingVersion
      ? 'Hide wallet version?'
      : 'Show wallet version?';
    const questionID = newID();
    listenOnce(`confirm-answer:${questionID}`, (event, agreed) => {
      if (agreed) {
        if (showingVersion) {
          hideVersion();
        } else {
          showVersion();
        }
      }
    });

    send('confirm', { id: questionID, question });
  };

  handleChange = e => {
    this.props.updateInput(e.target.value);
  };

  render() {
    const { coreInfo, showingVersion, inputValue } = this.props;
    return (
      <Panel
        title="React Module Example"
        icon={{ url: 'react.svg', id: 'icon' }}
      >
        <GlobalStyles />
        <div className="mt1">This is a Nexus Module built with React</div>
        <div className="mt1 flex center">
          Show version{' '}
          <Tooltip.Trigger
            position="right"
            tooltip="This setting will be remembered even when you restart
          the wallet"
          >
            <Switch checked={showingVersion} onChange={this.confirmToggle} />
          </Tooltip.Trigger>
        </div>
        <div className="mt1">Connections: {coreInfo.connections}</div>
        {!!showingVersion && (
          <div className="mt1">Wallet version: {coreInfo.version}</div>
        )}
        <div className="mt1">
          <TextField
            value={inputValue}
            onChange={this.handleChange}
            placeholder="What you type in this textbox will be remembered even when you navigate away from the module"
          />
        </div>
      </Panel>
    );
  }
}

export default Main;
