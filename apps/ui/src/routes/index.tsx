import { Box } from "@mui/material";
import { createFileRoute } from "@tanstack/react-router";
import { EventStormingControlBar } from "../event-storming/components/EventStormingControlBar";
import { AvatarSkeleton } from "../session/components/AvatarSkeleton";
import { CurrentUserAvatar } from "../session/components/CurrentUserAvatar";
import { SignInButton } from "../session/components/SignInButton";
import { useSession } from "../session/hooks/useSession";
import { WhiteboardComponent } from "../whiteboard/components/WhiteboardComponent";

export const Route = createFileRoute("/")({
  component: () => {
    const { isSessionLoading, isSignInLoading, session, signIn, signOut } = useSession();

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
    );
  },
});
