import { Box, createTheme, CssBaseline, ThemeProvider } from "@mui/material";
import { EventStormingControlBar } from "./event-storming/components/EventStormingControlBar.tsx";
import { WhiteboardComponent } from "./whiteboard/components/WhiteboardComponent.tsx";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

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
          bottom: 10,
          display: "flex",
          justifyContent: "center",
          position: "absolute",
          width: "100%",
        }}
      >
        <EventStormingControlBar />
      </Box>
    </WhiteboardComponent>
  </ThemeProvider>
);

export default App;
