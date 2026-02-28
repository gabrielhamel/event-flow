import { useWhiteboard } from "../../whiteboard/hooks/useWhiteboard.tsx";

export type EventStormingEntityType = "event" | "command" | "actor" | "policy" | "hotSpot" | "externalSystem";

export const EventStormingEntityColors: Record<EventStormingEntityType, string> = {
  actor: "#50C878",
  command: "#0096FF",
  event: "#FFA500",
  externalSystem: "#A9A9A9",
  hotSpot: "#FF69B4",
  policy: "#CF9FFF",
} as const;

export const useEventStorming = () => {
  const { addStickyNote } = useWhiteboard();

  const addEntity = (type: EventStormingEntityType) => {
    const color = EventStormingEntityColors[type];

    addStickyNote(color);
  };

  return {
    addEntity,
  };
};
