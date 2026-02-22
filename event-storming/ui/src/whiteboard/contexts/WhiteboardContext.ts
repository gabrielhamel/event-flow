import { createContext } from "react";
import type { Whiteboard } from "../Whiteboard.ts";

type WhiteboardContextData = {
  whiteboard: Whiteboard | null;
};

export const WhiteboardContext = createContext<WhiteboardContextData>(
  {
    whiteboard: null,
  },
);
