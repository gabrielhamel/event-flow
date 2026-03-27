import { Box, createTheme, CssBaseline, ThemeProvider } from "@mui/material";
import { EventStormingControlBar } from "./event-storming/components/EventStormingControlBar";
import { WhiteboardComponent } from "./whiteboard/components/WhiteboardComponent";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import { createAuthClient } from "better-auth/react";
import { apiBaseUrl } from "./constants";

const darkTheme = createTheme({
  palette: {
    mode: "light",
  },
});

const auth = createAuthClient({
  baseURL: `${apiBaseUrl}/auth`,
});

const App = () => {
  const { data } = auth.useSession();

  console.log(data);

  return (
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
};

export default App;
