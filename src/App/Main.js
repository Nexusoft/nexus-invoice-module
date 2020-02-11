import {
  showConnections,
  hideConnections,
  updateInput,
} from 'actions/actionCreators';
import Invoice from './Invoice';

const {
  libraries: {
    React,
    ReactRedux: { connect },
    emotion: { styled },
  },
  components: { GlobalStyles, Panel, Switch, Tooltip, TextField, Button },
  utilities: {
    confirm,
      
    showErrorDialog,
    showSuccessDialog,
  },
} = NEXUS;

const DemoTextField = styled(TextField)({
  maxWidth: 400,
});

@connect(
  state => ({
    coreInfo: state.coreInfo,
    showingConnections: state.settings.showingConnections,
    inputValue: state.ui.inputValue,
  }),
  { showConnections, hideConnections, updateInput }
)
class Main extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {}

  render() {
    const { coreInfo, showingConnections, inputValue } = this.props;
    return (
      <Panel title="Invoices" icon={{ url: 'react.svg', id: 'icon' }}>
        <GlobalStyles />
        <Invoice />
      </Panel>
    );
  }
}

export default Main;
