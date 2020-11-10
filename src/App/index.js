import Main from './Main';

const {
  libraries: {
    React,
    ReactRedux: { useSelector },
    emotion: {
      createCache,
      core: { CacheProvider },
      theming: { ThemeProvider },
    },
  },
  utilities: { color },
} = NEXUS;

const emotionCache = createCache({ container: document.head });

export default function App() {
  const initialized = useSelector((state) => state.initialized);
  const theme = useSelector((state) => state.theme);
  if (!initialized) return null;

  const themeWithMixer = {
    ...theme,
    mixer: color.getMixer(theme.background, theme.foreground),
  };

  return (
    <CacheProvider value={emotionCache}>
      <ThemeProvider theme={themeWithMixer}>
        <Main />
      </ThemeProvider>
    </CacheProvider>
  );
}
