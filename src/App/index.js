import Main from './Main';

const {
  libraries: {
    React,
    ReactRedux: { connect },
    emotion: {
      createCache,
      core: { CacheProvider },
      theming: { ThemeProvider },
    },
  },
  utilities: { color },
} = NEXUS;

const emotionCache = createCache({ container: document.head });

@connect(state => ({
  initialized: state.initialized,
  theme: state.theme,
}))
class App extends React.Component {
  render() {
    const { initialized, theme } = this.props;
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
}

export default App;
