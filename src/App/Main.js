import { useState } from 'react';
import styled from '@emotion/styled';
import { useSelector, useDispatch } from 'react-redux';
import {
  GlobalStyles,
  Panel,
  Switch,
  Tooltip,
  TextField,
  Button,
  FieldSet,
  Link,
  confirm,
  apiCall,
  showErrorDialog,
  showSuccessDialog,
} from 'nexus-module';

import {
  showConnections,
  hideConnections,
  updateInput,
} from 'actions/actionCreators';

const DemoTextField = styled(TextField)({
  maxWidth: 400,
});

export default function Main() {
  const coreInfo = useSelector((state) => state.nexus.coreInfo);
  const userStatus = useSelector((state) => state.nexus.userStatus);
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
  const [checkingMetrics, setCheckingMetrics] = useState(false);
  const viewMetrics = async () => {
    try {
      setCheckingMetrics(true);
      const result = await apiCall('system/get/metrics');
      showSuccessDialog({
        message: 'Tritium Metrics',
        note: JSON.stringify(result, null, 2),
      });
    } catch (error) {
      showErrorDialog({
        message: 'Cannot get metrics',
        note: error?.message || 'Unknown error',
      });
    } finally {
      setCheckingMetrics(false);
    }
  };

  return (
    <Panel title="React Redux Module" icon={{ url: 'react.svg', id: 'icon' }}>
      <GlobalStyles />
      <div className="text-center">
        Check out{' '}
        <Link
          as="a"
          href="https://github.com/Nexusoft/NexusInterface/tree/master/docs/Modules"
        >
          Developer's guide to Nexus Wallet Module
        </Link>{' '}
        for documentation and API reference.
      </div>

      <div className="mt2 flex center">
        <FieldSet legend="Module storage">
          <p>
            <strong>Module storage</strong> is a feature that allows modules to
            save data (module's settings for example) into a file so that it
            won't be lost when user closes their wallet.
          </p>
          <p>
            The on/off state of the switch below will be saved to a file using{' '}
            <Link
              as="a"
              href="https://github.com/Nexusoft/NexusInterface/blob/master/docs/Modules/nexus-global-variable.md#updatestorage"
            >
              updateStorage
            </Link>{' '}
            utility function. Try switching it and restart your wallet to see if
            the switch state is retained.
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
            The content of the textbox below will be saved to base wallet's
            state using{' '}
            <Link
              as="a"
              href="https://github.com/Nexusoft/NexusInterface/blob/master/docs/Modules/nexus-global-variable.md#updatestate"
            >
              updateState
            </Link>{' '}
            utility function. Try filling it out then switch to Overview and
            switch back to see if the content is still there.
          </p>
          <DemoTextField
            value={inputValue}
            onChange={handleChange}
            placeholder="Type anything here"
          />
        </FieldSet>
      </div>

      <div className="mt2 flex center">
        <FieldSet legend="Live updated data">
          <p>
            Core information, user status, local address book, wallet theme and
            settings will be fed into your module when your module is
            initialized and when those data are changed.
          </p>
          <div className="mt1">
            Core connections:{' '}
            <strong>{coreInfo ? coreInfo.connections : 'Not connected'}</strong>
          </div>
          <div>
            User status:{' '}
            <strong>{userStatus ? 'Logged in' : 'Not logged in'}</strong>
          </div>
        </FieldSet>
      </div>

      <div className="mt2">
        <FieldSet legend="API calls">
          <p>
            You can make API calls from your module to the Nexus Core using{' '}
            <Link
              as="a"
              href="https://github.com/Nexusoft/NexusInterface/blob/master/docs/Modules/nexus-global-variable.md#apicall"
            >
              apiCall
            </Link>{' '}
            utility function. Click the button below to view blockchain metrics.
          </p>
          <Button onClick={viewMetrics} disabled={checkingMetrics}>
            View blockchain metrics
          </Button>
        </FieldSet>
      </div>
    </Panel>
  );
}
