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
  components: {ThemeController},
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

  //const theme = useSelector((state) => state.theme);
    if (!initialized) return null;


    const { popUp } = this.props;
    const PopUp = popUp && modals[popUp.name];

    return (
      <CacheProvider value={emotionCache}>
        <ThemeController theme={theme}>
          <Main />
          {PopUp && (
            <PopUp
              {...popUp.props}
              removeModal={() => this.props.ClosePopUp()}
            />
          )}
        </ThemeController>
      </CacheProvider>
    );
  }
}

export default App;
