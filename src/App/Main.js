import {
  showConnections,
  hideConnections,
  updateInput,
} from 'actions/actionCreators';

const {
  libraries: {
    React,
    ReactRedux: { useSelector, useDispatch },
    emotion: { styled },
  },
  components: { GlobalStyles, Panel, Switch, Tooltip, TextField, Button },
  utilities: { confirm, rpcCall, showErrorDialog, showSuccessDialog },
} = NEXUS;

const DemoTextField = styled(TextField)({
  maxWidth: 400,
});

async function viewDifficulty() {
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
}

export default function Main() {
  const coreInfo = useSelector((state) => state.coreInfo);
  const showingConnections = useSelector(
    (state) => state.settings.showingConnections
  );
  const inputValue = useSelector((state) => state.ui.inputValue);
  const dispatch = useDispatch();
  const confirmToggle = async () => {
    const question = showingConnections
      ? 'Hide number of connections?'
      : 'Show number of connections?';

    const agreed = await confirm({ question });
    if (agreed) {
      if (showingConnections) {
        dispatch(hideConnections());
      } else {
        dispatch(showConnections());
      }
    }
  };
  const handleChange = (e) => {
    dispatch(updateInput(e.target.value));
  };

  return (
    <Panel title="React Module Example" icon={{ url: 'react.svg', id: 'icon' }}>
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
          <Switch checked={showingConnections} onChange={confirmToggle} />
        </Tooltip.Trigger>
      </div>
      {!!showingConnections && <div>Connections: {coreInfo.connections}</div>}

      <div className="mt2">
        <div>
          This textbox's content will be remembered even when you navigate away
          from this module
        </div>
        <DemoTextField
          value={inputValue}
          onChange={handleChange}
          placeholder="Type anything here"
        />
      </div>

      <div className="mt2">
        <Button onClick={viewDifficulty}>View mining difficulty</Button>
      </div>
    </Panel>
  );
}
