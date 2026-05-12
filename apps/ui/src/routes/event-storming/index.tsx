import { generateId } from "@repo/core/Id";
import { createFileRoute, useRouter } from "@tanstack/react-router";
import { useEffect } from "react";
import { useSession } from "../../session/hooks/useSession";

export const Route = createFileRoute("/event-storming/")({
  component: EventStormingIndexPage,
});

function EventStormingIndexPage() {
  const { isSessionLoading, session } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (!isSessionLoading && !session) {
      router
        .navigate({
          to: "/auth",
          search: { redirectPath: `/event-storming` },
        })
        .catch((error) => {
          console.error("Failed to navigate to auth page", error);
        });
    }

    router
      .navigate({
        to: `/event-storming/${generateId()}`,
      })
      .catch((error) => {
        console.error("Failed to navigate to new event storming", error);
      });
  }, [isSessionLoading, session, router]);

  return <></>;
}
