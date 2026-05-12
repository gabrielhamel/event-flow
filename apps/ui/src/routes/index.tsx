import { Button, Stack, Typography } from "@mui/material";
import { generateId } from "@repo/core/Id";
import { useMutation } from "@tanstack/react-query";
import { Link, createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { apiViewClient } from "../apiClient";
import { CenteredLayout } from "../components/CenteredLayout";
import { useSession } from "../session/hooks/useSession";

export const Route = createFileRoute("/")({
  component: IndexPage,
});

function IndexPage() {
  const navigate = Route.useNavigate();
  const { session, isSessionLoading } = useSession();
  const [isCreating, setIsCreating] = useState(false);

  const { mutateAsync } = useMutation(apiViewClient.eventStorming.create.mutationOptions());

  const handleOnNewEventStorming = () => {
    setIsCreating(true);

    const eventStormingId = generateId();

    mutateAsync({
      id: eventStormingId,
    })
      .then(() => {
        return navigate({
          to: "/event-storming/$eventStormingId",
          params: { eventStormingId },
        }).finally(() => {
          setIsCreating(false);
        });
      })
      .catch((error) => {
        console.error("Failed to create event storming", error);

        setIsCreating(false);
      });
  };

  return (
    <CenteredLayout>
      <Stack spacing={2}>
        <Typography>Welcome to the EventFlow!</Typography>
        {session ? (
          <Button
            variant="outlined"
            onClick={handleOnNewEventStorming}
            loading={isCreating || isSessionLoading}
          >
            New event storming
          </Button>
        ) : (
          <Link to="/auth" search={{ redirectPath: "/" }}>
            <Button variant="outlined" disabled={isSessionLoading}>
              Log in to create your first event storming
            </Button>
          </Link>
        )}
      </Stack>
    </CenteredLayout>
  );
}
