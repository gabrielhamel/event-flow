import { Box, createTheme, CssBaseline, ThemeProvider } from "@mui/material";
import { Outlet, createRootRoute } from "@tanstack/react-router";
import { useMemo } from "react";
import { useThemeMode } from "../useThemeMode";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

export const Route = createRootRoute({
  component: RootComponent,
});

function RootComponent() {
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
      <Box height={"100vh"} width={"100vw"}>
        <Outlet />
      </Box>
    </ThemeProvider>
  );
}
