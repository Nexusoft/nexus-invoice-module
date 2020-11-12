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
  components: {
    GlobalStyles,
    Panel,
    Switch,
    Tooltip,
    TextField,
    Button,
    FieldSet,
  },
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
    <Panel title="React Redux Module" icon={{ url: 'react.svg', id: 'icon' }}>
      <GlobalStyles />
      <div className="text-center">
        This showcases how a Nexus Wallet Modules can interact with the base
        wallet.
      </div>

      <div className="mt2 flex center">
        <FieldSet legend="Module storage">
          <p>
            <strong>Module storage</strong> is a feature that allows modules to
            save data (module's settings for example) into a file so that it
            won't be lost when user closes their wallet.
          </p>
          <p>
            The on/off state of the Switch below will be saved using module
            storage feature. Try switching it and restart your wallet to see if
            its state is retained.
          </p>
          <Tooltip.Trigger
            position="right"
            tooltip="Click me then restart wallet"
          >
            <Switch checked={showingConnections} onChange={confirmToggle} />
          </Tooltip.Trigger>
        </FieldSet>
      </div>

      <div className="mt2">
        <FieldSet legend="Module state">
          <p>
            Since your module is embedded inside a &lt;webview&gt; tag, normally
            when user navigates away from your module page, the &lt;Webview&gt;
            will be unmounted and all your module state will be lost.{' '}
            <strong>Module state</strong> is a feature that allows modules to
            save temporary state data on the base wallet so that it won't be
            lost when user navigates away from the module.
          </p>
          <p>
            This textbox's content will be remembered even when you navigate
            away from this module
          </p>
          <DemoTextField
            value={inputValue}
            onChange={handleChange}
            placeholder="Type anything here"
          />
        </FieldSet>
      </div>

      <div className="mt2 flex center"></div>
      {!!showingConnections && <div>Connections: {coreInfo.connections}</div>}

      <div className="mt2">
        <Button onClick={viewDifficulty}>View mining difficulty</Button>
      </div>
    </Panel>
  );
}
