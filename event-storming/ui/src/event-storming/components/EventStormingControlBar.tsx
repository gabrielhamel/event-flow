import { Cloud, Event, LocalFireDepartment, Person, Rule, Send } from "@mui/icons-material";
import { BottomNavigation, BottomNavigationAction } from "@mui/material";
import { createElement, type ElementType, type ReactElement } from "react";
import {
  EventStormingEntityColors,
  type EventStormingEntityType,
  useEventStorming,
} from "../hooks/useEventStorming.ts";

type AddEntityAction = {
  label: string;
  entity: EventStormingEntityType;
  icon: ReactElement;
};

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
      label: "Event",
      entity: "event",
      icon: createEntityIcon("event", Event),
    },
    {
      label: "Command",
      entity: "command",
      icon: createEntityIcon("command", Send),
    },
    {
      label: "Actor",
      entity: "actor",
      icon: createEntityIcon("actor", Person),
    },
    {
      label: "Policy",
      entity: "policy",
      icon: createEntityIcon("policy", Rule),
    },
    {
      label: "HotSpot",
      entity: "hotSpot",
      icon: createEntityIcon("hotSpot", LocalFireDepartment),
    },
    {
      label: "External System",
      entity: "externalSystem",
      icon: createEntityIcon("externalSystem", Cloud),
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
