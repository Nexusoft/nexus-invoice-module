import { useSelector } from 'react-redux';
import { ModuleWrapper } from 'nexus-module';
import { Global } from '@emotion/react';

import tableStyles from 'tableStyles';
import Main from './Main';
import Modals from './Modals';

export default function App() {
  const initialized = useSelector((state) => state.nexus.initialized);
  const theme = useSelector((state) => state.nexus.theme);

  return (
    <ModuleWrapper initialized={initialized} theme={theme}>
      <Global styles={tableStyles} />
      <Main />
      <Modals />
    </ModuleWrapper>
  );
}
