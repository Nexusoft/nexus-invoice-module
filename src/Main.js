const {
  libraries: { React },
  components: {
    GlobalStyles,
    Panel,
    Button,
    Tooltip,
    TextField,
    Switch,
    Select,
  },
} = nexus;

const App = () => (
  <Panel title="React Module Example">
    <GlobalStyles />
    <div className="mt1">This is a Nexus Module built with React</div>
    <div className="mt1">
      <Button className="space-right">Default button</Button>
      <Button className="space-right" skin="primary">
        Primary button
      </Button>
      <Button className="space-right" skin="blank-light">
        Blank light button
      </Button>
      <Tooltip.Trigger tooltip="This is a tooltip">
        <Button className="space-right" skin="hyperlink">
          Hyperlink button
        </Button>
      </Tooltip.Trigger>
    </div>
    <div className="mt1">
      <TextField placeholder="This is an input" />
    </div>
    <div className="mt1">
      <TextField multiline placeholder="This is a multiline input" rows={1} />
    </div>
    <div className="mt1">
      <Switch />
    </div>
    <div className="mt1">
      <Select
        value={1}
        onChange={() => {}}
        options={[
          { display: 'Option 1', value: 1 },
          { display: 'Option 2', value: 2 },
        ]}
      />
    </div>
  </Panel>
);

export default App;
