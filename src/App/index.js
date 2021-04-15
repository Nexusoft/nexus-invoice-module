import Main from './Main';
import { ClosePopUp } from 'lib/ui';
import InvoiceModal from './Invoice/InvoiceModal';
import InvoiceDetailsModal from './Invoice/InvoiceDetailsModal';
import AccountAsk from 'component/AccountAsk';

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

const emotionCache = createCache({
  key: 'nexus-invoice-module-emotion-cache',
  container: document.head,
});

const modals = {
  Invoice: InvoiceModal,
  InvoiceDetails: InvoiceDetailsModal,
  AccountAsk: AccountAsk,
};

@connect(
  (state) => ({
    initialized: state.initialized,
    theme: state.theme,
    popUp: state.popUps,
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
    const { popUp } = this.props;
    const PopUp = popUp && modals[popUp.name];
    console.log(popUp);
    console.log(PopUp);
    return (
      <CacheProvider value={emotionCache}>
        <ThemeProvider theme={themeWithMixer}>
          <Main />
          {PopUp && (
            <PopUp
              {...popUp.props}
              removeModal={() => this.props.ClosePopUp()}
            />
          )}
        </ThemeProvider>
      </CacheProvider>
    );
  }
}

export default App;
