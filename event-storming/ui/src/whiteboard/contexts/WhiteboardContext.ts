import type { FabricWhiteboard } from "@repo/event-storming-ui/whiteboard/FabricWhiteboard";
import { createContext } from "react";

interface WhiteboardContextData {
  whiteboard: FabricWhiteboard | null;
}

export const WhiteboardContext = createContext<WhiteboardContextData>(
  {
    whiteboard: null,
  },
);
