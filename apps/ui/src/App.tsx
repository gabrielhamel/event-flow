import { Box, createTheme, CssBaseline, ThemeProvider } from "@mui/material";
import { useMemo } from "react";
import { EventStormingControlBar } from "./event-storming/components/EventStormingControlBar";
import { AvatarSkeleton } from "./session/components/AvatarSkeleton";
import { CurrentUserAvatar } from "./session/components/CurrentUserAvatar";
import { SignInButton } from "./session/components/SignInButton";
import { useSession } from "./session/hooks/useSession";
import { useThemeMode } from "./useThemeMode";
import { WhiteboardComponent } from "./whiteboard/components/WhiteboardComponent";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

const App = () => {
  const { isSessionLoading, isSignInLoading, session, signIn, signOut } = useSession();
  const { mode } = useThemeMode();

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode,
        },
      }),
    [mode],
  );

  return (
    <ThemeProvider theme={theme}>
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
          {isSessionLoading && <AvatarSkeleton />}
          {!isSessionLoading && !session && (
            <SignInButton signIn={signIn} isSignInLoading={isSignInLoading} />
          )}
          {session && (
            <CurrentUserAvatar
              username={session.user.name}
              avatarUrl={session.user.image ?? undefined}
              onSignOut={signOut}
            />
          )}
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
