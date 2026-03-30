import { Avatar, Box, Button, createTheme, CssBaseline, Skeleton, ThemeProvider } from "@mui/material";
import { EventStormingControlBar } from "./event-storming/components/EventStormingControlBar";
import { WhiteboardComponent } from "./whiteboard/components/WhiteboardComponent";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import { getInfraConfig } from "@repo/core/infra/config";
import { createAuthClient } from "better-auth/react";
import { useState } from "react";

const isInDevelopment = import.meta.env.MODE === "development";
const { apiBaseUrl, uiBaseUrl } = getInfraConfig(isInDevelopment);

const darkTheme = createTheme({
  palette: {
    mode: "light",
  },
});

const auth = createAuthClient({
  baseURL: `${apiBaseUrl}/auth`,
});

const App = () => {
  const { data: session, isPending, isRefetching } = auth.useSession();

  const [isSignIn, setIsSignIn] = useState(false);

  const avatarData = session?.user.name.split(" ").map(word => word[0]).join("") ?? "";
  const isSessionLoading = isPending || isRefetching;

  const handleSignInWithGithub = () => {
    setIsSignIn(true);

    auth.signIn.social({
      callbackURL: uiBaseUrl,
      provider: "github",
    }).catch((error: unknown) => {
      console.error("Error signing in with GitHub:", error);
      setIsSignIn(false);
    });
  };

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <WhiteboardComponent>
        <Box
          sx={{
            display: "flex",
            justifyContent: "end",
            position: "absolute",
            right: 10,
            top: 10,
            width: "100%",
          }}
        >
          {isSessionLoading && <Skeleton variant="circular" width={40} height={40} />}
          {(!isSessionLoading && !session) && (
            <Button
              variant="outlined"
              onClick={handleSignInWithGithub}
              loading={isSignIn}
            >
              SignIn
            </Button>
          )}
          {(!isSessionLoading && session) && <Avatar>{avatarData}</Avatar>}
        </Box>

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
