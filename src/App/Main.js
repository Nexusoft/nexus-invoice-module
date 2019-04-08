import { showVersion, hideVersion } from 'actions/actionCreators';

const {
  libraries: {
    React,
    ReactRedux: { connect },
  },
  components: { GlobalStyles, Panel, Switch, Tooltip },
  sendMessage,
  once,
} = nexusWallet;

const newID = (() => {
  let id = 0;
  return () => ++id;
})();

@connect(
  state => ({
    coreInfo: state.coreInfo,
    showingVersion: state.showingVersion,
  }),
  { showVersion, hideVersion }
)
class Main extends React.Component {
  confirmToggle = () => {
    const { showingVersion } = this.props;
    const question = showingVersion
      ? 'Hide wallet version?'
      : 'Show wallet version?';
    const questionID = newID();
    once(`confirm-answer:${questionID}`, (event, agreed) => {
      if (agreed) {
        if (showingVersion) {
          this.hideVersion();
        } else {
          this.showVersion();
        }
      }
    });
    sendMessage('confirm', { id: questionID, question });
  };

  hideVersion = () => {
    this.props.hideVersion();
    sendMessage('update-storage', {
      showingVersion: false,
    });
  };

  showVersion = () => {
    this.props.showVersion();
    sendMessage('update-storage', {
      showingVersion: true,
    });
  };

  render() {
    const { coreInfo, showingVersion } = this.props;
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
      </Panel>
    );
  }
}

export default Main;
