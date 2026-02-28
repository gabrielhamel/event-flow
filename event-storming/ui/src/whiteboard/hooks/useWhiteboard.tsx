import { useContext } from "react";
import { WhiteboardContext } from "../contexts/WhiteboardContext.ts";

export const useWhiteboard = () => {
  const { whiteboard } = useContext(WhiteboardContext);

  const addStickyNote = (color: string) => {
    if (!whiteboard) {
      return;
    }

    whiteboard.addStickyNote(color);
  };

  return { addStickyNote };
};
