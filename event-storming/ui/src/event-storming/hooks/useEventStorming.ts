import { useWhiteboard } from "../../whiteboard/hooks/useWhiteboard.tsx";

export type EventStormingEntityType = "event" | "command" | "actor" | "policy" | "hotSpot" | "externalSystem";

export const EventStormingEntityColors: Record<EventStormingEntityType, string> = {
  event: "#FFA500",
  command: "#0096FF",
  actor: "#50C878",
  policy: "#CF9FFF",
  hotSpot: "#FF69B4",
  externalSystem: "#A9A9A9",
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
