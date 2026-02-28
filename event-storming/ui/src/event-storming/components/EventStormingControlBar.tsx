import { Cloud, Event, LocalFireDepartment, Person, Rule, Send } from "@mui/icons-material";
import { BottomNavigation, BottomNavigationAction } from "@mui/material";
import { createElement, type ElementType, type ReactElement } from "react";
import {
  EventStormingEntityColors,
  type EventStormingEntityType,
  useEventStorming,
} from "../hooks/useEventStorming.ts";

interface AddEntityAction {
  label: string;
  entity: EventStormingEntityType;
  icon: ReactElement;
}

export const EventStormingControlBar = () => {
  const { addEntity } = useEventStorming();

  const createEntityIcon = (entity: EventStormingEntityType, icon: ElementType) =>
    createElement(icon, {
      sx: {
        color: EventStormingEntityColors[entity],
      },
    });

  const actions: AddEntityAction[] = [
    {
      entity: "event",
      icon: createEntityIcon("event", Event),
      label: "Event",
    },
    {
      entity: "command",
      icon: createEntityIcon("command", Send),
      label: "Command",
    },
    {
      entity: "actor",
      icon: createEntityIcon("actor", Person),
      label: "Actor",
    },
    {
      entity: "policy",
      icon: createEntityIcon("policy", Rule),
      label: "Policy",
    },
    {
      entity: "hotSpot",
      icon: createEntityIcon("hotSpot", LocalFireDepartment),
      label: "HotSpot",
    },
    {
      entity: "externalSystem",
      icon: createEntityIcon("externalSystem", Cloud),
      label: "External System",
    },
  ];

  return (
    <BottomNavigation showLabels sx={{ borderRadius: "15px", boxShadow: 1, gap: 3, paddingX: 5 }}>
      {actions.map(({ label, entity, icon }) => (
        <BottomNavigationAction
          key={label}
          label={label}
          onClick={() => addEntity(entity)}
          icon={icon}
        />
      ))}
    </BottomNavigation>
  );
};
