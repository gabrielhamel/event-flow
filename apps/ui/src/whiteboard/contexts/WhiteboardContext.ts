import type { FabricWhiteboard } from "@repo/ui/whiteboard/FabricWhiteboard";
import { createContext } from "react";

interface WhiteboardContextData {
  whiteboard: FabricWhiteboard | null;
}

export const WhiteboardContext = createContext<WhiteboardContextData>(
  {
    whiteboard: null,
  },
);
