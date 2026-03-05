import type { CursorFactory } from "@repo/core/collaborative/CollaborativeWhiteboardSession";
import type { CursorCollaborativeData } from "@repo/core/collaborative/CursorCollaborativeData";
import { FabricCursor } from "@repo/event-storming-ui/whiteboard/FabricCursor";
import { type Canvas, loadSVGFromURL } from "fabric";

const cursorSVG = await loadSVGFromURL("cursor.svg");

export class FabricCursorFactory implements CursorFactory {
  private readonly canvas: Canvas;

  constructor(canvas: Canvas) {
    this.canvas = canvas;
  }

  create(data: CursorCollaborativeData) {
    return new FabricCursor({
      canvas: this.canvas,
      data,
      svg: cursorSVG,
    });
  }
}
