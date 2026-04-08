import { GitHub } from "@mui/icons-material";
import { Button, Stack } from "@mui/material";
import { createFileRoute } from "@tanstack/react-router";
import { CenteredLayout } from "../components/CenteredLayout";
import { useSession } from "../session/hooks/useSession";

export const Route = createFileRoute("/auth")({
  component: AuthPage,
});

function AuthPage() {
  const { signIn } = useSession();

  return (
    <CenteredLayout>
      <Stack borderRadius={2} p={2} spacing={2}>
        <Button variant="contained" startIcon={<GitHub />} onClick={() => signIn("github")}>
          Github
        </Button>
      </Stack>
    </CenteredLayout>
  );
}
