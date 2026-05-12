import { createContext } from "react";
import type { FabricWhiteboard } from "../FabricWhiteboard";

interface WhiteboardContextData {
  whiteboard: FabricWhiteboard | null;
}

export const WhiteboardContext = createContext<WhiteboardContextData>({
  whiteboard: null,
});
