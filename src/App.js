const {
  libraries: {
    React,
    emotion: {
      styled,
      createCache,
      core: { CacheProvider },
      theming: { ThemeProvider },
    },
  },
  utilities: { color },
  components: { GlobalStyles, Panel },
  onMessage,
} = nexus;

const emotionCache = createCache({ container: document.head });

const Title = styled('h3')({
  textAlign: 'center',
  color: 'white',
  fontWeight: 'normal',
});

class App extends React.Component {
  state = {
    initialized: false,
    theme: {},
  };

  constructor(props) {
    super(props);
    onMessage('initialize', (evt, { theme }) => {
      console.log('theme', theme);
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
          <Panel title="React Module Example">
            <GlobalStyles />
            <Title>Hello Universe! Hello Nexus!</Title>
          </Panel>
        </ThemeProvider>
      </CacheProvider>
    );
  }
}

export default App;
