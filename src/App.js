const {
  libraries: {
    React,
    emotion: {
      styled,
      createCache,
      core: { CacheProvider },
    },
  },
} = nexus;

const emotionCache = createCache({ container: document.head });

const Title = styled('h1')({
  textAlign: 'center',
  color: 'white',
  fontWeight: 'normal',
  fontFamily: 'Gill Sans", "Gill Sans MT", Calibri, "Trebuchet MS", sans-serif',
});

const App = () => (
  <CacheProvider value={emotionCache}>
    <div>
      <Title>Hello Universe! Hello Nexus!</Title>
    </div>
  </CacheProvider>
);

export default App;
