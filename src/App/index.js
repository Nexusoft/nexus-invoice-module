import { useSelector } from 'react-redux';

import Main from './Main';

const {
  libraries: {
    React,
    emotion: {
      createCache,
      core: { CacheProvider },
    },
  },
  components: { ThemeController },
} = NEXUS;

const emotionCache = createCache({ container: document.head, key: 'emotion' });

export default function App() {
  const initialized = useSelector((state) => state.nexus.initialized);
  const theme = useSelector((state) => state.nexus.theme);
  if (!initialized) return null;

  return (
    <CacheProvider value={emotionCache}>
      <ThemeController theme={theme}>
        <Main />
      </ThemeController>
    </CacheProvider>
  );
}
