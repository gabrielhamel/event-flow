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
      router.navigate({
        to: "/auth",
        search: { redirectPath: `/event-storming` },
      });
    }

    router.navigate({
      to: `/event-storming/${generateId()}`,
    });
  }, [isSessionLoading, session, router]);

  return <></>;
}
