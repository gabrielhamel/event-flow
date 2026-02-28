import { createContext } from "react";
import type { Whiteboard } from "../Whiteboard.ts";

interface WhiteboardContextData {
  whiteboard: Whiteboard | null;
}

export const WhiteboardContext = createContext<WhiteboardContextData>(
  {
    whiteboard: null,
  },
);
