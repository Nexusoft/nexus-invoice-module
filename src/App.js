import Main from './Main';

const {
  libraries: {
    React,
    emotion: {
      createCache,
      core: { CacheProvider },
      theming: { ThemeProvider },
    },
  },
  utilities: { color },
  on,
} = nexusWallet;

const emotionCache = createCache({ container: document.head });

class App extends React.Component {
  state = {
    initialized: false,
    theme: {},
  };

  constructor(props) {
    super(props);
    on('initialize', (evt, { theme }) => {
      this.setState({ initialized: true, theme });
    });
  }

  render() {
    const { initialized, theme } = this.state;
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
