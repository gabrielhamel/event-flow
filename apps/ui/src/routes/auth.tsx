import { GitHub, Google } from "@mui/icons-material";
import { Box, Button, CircularProgress, Stack, Typography } from "@mui/material";
import { createFileRoute } from "@tanstack/react-router";
import z from "zod";
import { CenteredLayout } from "../components/CenteredLayout";
import { useSession } from "../session/hooks/useSession";

export const Route = createFileRoute("/auth")({
  component: AuthPage,
  validateSearch: z.object({
    redirectPath: z.string().optional(),
  }),
});

function AuthPage() {
  const { signIn, isSignInLoading } = useSession();
  const { redirectPath } = Route.useSearch();
  const redirectPathWithDefault = redirectPath ?? "/";

  return (
    <CenteredLayout>
      <Stack borderRadius={2} p={2} spacing={2}>
        <Typography>You should be authenticated to see this page</Typography>
        {isSignInLoading ? (
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
            }}
          >
            <CircularProgress />
          </Box>
        ) : (
          <>
            <Button
              variant="contained"
              startIcon={<GitHub />}
              onClick={() => signIn("github", redirectPathWithDefault)}
              loading={isSignInLoading}
            >
              Github
            </Button>
            <Button
              variant="contained"
              startIcon={<Google />}
              onClick={() => signIn("google", redirectPathWithDefault)}
              loading={isSignInLoading}
            >
              Google
            </Button>
          </>
        )}
      </Stack>
    </CenteredLayout>
  );
}
