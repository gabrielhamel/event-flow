import { useContext } from "react";
import { WhiteboardContext } from "../contexts/WhiteboardContext";

export const useWhiteboard = () => {
  const { whiteboard } = useContext(WhiteboardContext);

  const addStickyNote = (color: string) => {
    if (!whiteboard) {
      return;
    }

    whiteboard.createStickyNote(color);
  };

  return { addStickyNote };
};
