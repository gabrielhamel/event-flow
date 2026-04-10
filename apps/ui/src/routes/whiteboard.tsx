import { Box } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { createFileRoute, useRouter } from "@tanstack/react-router";
import { useEffect } from "react";
import { apiViewClient } from "../apiClient";
import { EventStormingControlBar } from "../event-storming/components/EventStormingControlBar";
import { AvatarSkeleton } from "../session/components/AvatarSkeleton";
import { CurrentUserAvatar } from "../session/components/CurrentUserAvatar";
import { useSession } from "../session/hooks/useSession";
import { WhiteboardComponent } from "../whiteboard/components/WhiteboardComponent";

export const Route = createFileRoute("/whiteboard")({
  component: WhiteboardPage,
});

function WhiteboardPage() {
  const { isSessionLoading, session, signOut } = useSession();
  const router = useRouter();
  const { data: currentUser } = useQuery(apiViewClient.user.current.queryOptions());

  useEffect(() => {
    if (!isSessionLoading && !session) {
      router.navigate({
        to: "/auth",
        search: { redirectPath: "/whiteboard" },
      });
    }
  });

  return (
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
        {currentUser ? (
          <CurrentUserAvatar
            username={currentUser.name}
            avatarUrl={currentUser.avatarUrl}
            onSignOut={signOut}
          />
        ) : (
          <AvatarSkeleton />
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
  );
}
