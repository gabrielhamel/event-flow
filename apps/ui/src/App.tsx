import {
  Avatar,
  Box,
  Button,
  createTheme,
  CssBaseline,
  ListItemIcon,
  Menu,
  MenuItem,
  Skeleton,
  ThemeProvider,
} from "@mui/material";
import { EventStormingControlBar } from "./event-storming/components/EventStormingControlBar";
import { WhiteboardComponent } from "./whiteboard/components/WhiteboardComponent";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import { Logout } from "@mui/icons-material";
import { getInfraConfig } from "@repo/core/infra/config";
import { createAuthClient } from "better-auth/react";
import { type MouseEvent, useState } from "react";

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
  const [anchorAvatarMenu, setAnchorAvatarMenu] = useState<null | HTMLElement>(null);

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

  const handleAvatarClick = (event: MouseEvent<HTMLDivElement>) => {
    setAnchorAvatarMenu(event.currentTarget);
  };

  const handleAvatarMenuClose = () => {
    setAnchorAvatarMenu(null);
  };

  const handleSignOut = () => {
    setAnchorAvatarMenu(null);

    auth.signOut().catch((error: unknown) => {
      console.error("Error signing out:", error);
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
            <>
              <Button
                variant="outlined"
                onClick={handleSignInWithGithub}
                loading={isSignIn}
              >
                Sign in
              </Button>
            </>
          )}
          {(!isSessionLoading && session) && (
            <>
              <Avatar
                component="div"
                sx={{
                  boxShadow: 1,
                }}
                src={session.user.image ?? undefined}
                onClick={handleAvatarClick}
              >
                {avatarData}
              </Avatar>
              <Menu open={Boolean(anchorAvatarMenu)} onClose={handleAvatarMenuClose} anchorEl={anchorAvatarMenu}>
                <MenuItem onClick={handleSignOut}>
                  <ListItemIcon>
                    <Logout fontSize="small" />
                  </ListItemIcon>
                  Sign out
                </MenuItem>
              </Menu>
            </>
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
