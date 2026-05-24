import { Box, Button, Stack, Typography } from "@mui/material";
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
    <CenteredLayout background="linear-gradient(to bottom right, #eef2ff, #ffffff, #faf5ff)">
      <Stack
        spacing={2}
        sx={{
          alignItems: "center",
        }}
      >
        <img src="logo-full.svg" width="145" />
        <Typography
          variant="h1"
          sx={{
            fontSize: "3rem",
            fontWeight: "bold",
            background: "linear-gradient(to right, #4f46e5, #9333ea, #4338ca)",
            backgroundClip: "text",
            color: "transparent",
            position: "relative",
            top: "-20px",
          }}
        >
          EventFlow
        </Typography>
        <Typography
          variant="h2"
          sx={{
            color: "#4B5563",
            fontSize: "18px",
            fontWeight: "regular",
          }}
        >
          Collaborative Domain-Driven Design with Intelligent Facilitation
        </Typography>
        <Typography
          variant="h3"
          sx={{
            color: "#6B7280",
            fontSize: "14px",
          }}
        >
          Event Storming • Context Mapping • Bounded Contexts
        </Typography>
        <Box
          sx={{
            paddingTop: "30px",
          }}
        >
          {session ? (
            <Button
              variant="outlined"
              onClick={handleOnNewEventStorming}
              loading={isCreating || isSessionLoading}
            >
              New event storming
            </Button>
          ) : (
            <Link to="/auth" search={{ redirectPath: "/event-storming" }}>
              <Button variant="outlined" disabled={isSessionLoading}>
                Create your first event storming
              </Button>
            </Link>
          )}
        </Box>
      </Stack>
    </CenteredLayout>
  );
}
