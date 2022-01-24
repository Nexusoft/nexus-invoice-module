import createCache from '@emotion/cache';
import { CacheProvider } from '@emotion/react';
import { useSelector } from 'react-redux';
import { ThemeController } from 'nexus-module';

import Main from './Main';
import Modals from './Modals';

const emotionCache = createCache({ container: document.head, key: 'emotion' });

export default function App() {
  const initialized = useSelector((state) => state.nexus.initialized);
  const theme = useSelector((state) => state.nexus.theme);
  if (!initialized) return null;

  return (
    <CacheProvider value={emotionCache}>
      <ThemeController theme={theme}>
        <Main />
        <Modals />
      </ThemeController>
    </CacheProvider>
  );
}
