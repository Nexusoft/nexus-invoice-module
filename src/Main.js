const {
  libraries: { React },
  components: { GlobalStyles, Panel, Button, Tooltip, TextField },
} = nexus;

const App = () => (
  <Panel title="React Module Example">
    <GlobalStyles />
    <p>This is a Nexus Module built with React</p>
    <p>
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
    </p>
    <p>
      <TextField placeholder="This is an input" />
    </p>
    <p>
      <TextField multiline placeholder="This is a multiline input" rows={1} />
    </p>
  </Panel>
);

export default App;
