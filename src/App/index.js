import Main from './Main';
import { ClosePopUp } from 'lib/ui';

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

const emotionCache = createCache({ key:'nexus-invoice-module-emotion-cache',container: document.head });

@connect(
  state => ({
    initialized: state.initialized,
    theme: state.theme,
    PopUp: state.popUps,
  }),
  { ClosePopUp }
)
class App extends React.Component {
  render() {
    const { initialized, theme } = this.props;
    if (!initialized) return null;

    const themeWithMixer = {
      ...theme,
      mixer: color.getMixer(theme.background, theme.foreground),
    };
    const { PopUp } = this.props;

    return (
      <CacheProvider value={emotionCache}>
        <ThemeProvider theme={themeWithMixer}>
          {PopUp ? (
            <PopUp.div
              {...PopUp.props}
              removeModal={() => this.props.ClosePopUp()}
            />
          ) : null}{' '}
          <Main />
        </ThemeProvider>
      </CacheProvider>
    );
  }
}

export default App;
