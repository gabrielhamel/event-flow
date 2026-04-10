import { Button, Stack, Typography } from "@mui/material";
import { createFileRoute, Link } from "@tanstack/react-router";
import { CenteredLayout } from "../components/CenteredLayout";

export const Route = createFileRoute("/")({
  component: IndexPage,
});

function IndexPage() {
  return (
    <CenteredLayout>
      <Stack spacing={2}>
        <Typography>Welcome to the DDD Lab!</Typography>
        <Link to="/whiteboard">
          <Button variant="outlined">New event storming</Button>
        </Link>
      </Stack>
    </CenteredLayout>
  );
}
