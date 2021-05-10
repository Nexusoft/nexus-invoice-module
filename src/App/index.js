import Main from './Main';
import Modals from './Modals';

const {
  libraries: {
    React,
    ReactRedux: { useSelector },
    emotion: {
      createCache,
      core: { CacheProvider },
    },
  },
  components: { ThemeController },
} = NEXUS;

const emotionCache = createCache({
  key: 'nexus-invoice-module-emotion-cache',
  container: document.head,
});

export default function App() {
  const initialized = useSelector((state) => state.initialized);
  const theme = useSelector((state) => state.theme);

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
