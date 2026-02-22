import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import { Box, createTheme, CssBaseline, ThemeProvider } from "@mui/material";
import { EventStormingControlBar } from "./event-storming/components/EventStormingControlBar.tsx";
import { WhiteboardComponent } from "./whiteboard/components/WhiteboardComponent.tsx";

const darkTheme = createTheme({
  palette: {
    mode: "light",
  },
});

const App = () => (
  <ThemeProvider theme={darkTheme}>
    <CssBaseline />
    <WhiteboardComponent>
      <Box
        sx={{
          position: "absolute",
          bottom: 10,
          width: "100%",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <EventStormingControlBar />
      </Box>
    </WhiteboardComponent>
  </ThemeProvider>
);

export default App;
