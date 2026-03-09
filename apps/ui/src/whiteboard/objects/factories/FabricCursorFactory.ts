import type { Cursor } from "@repo/core/whiteboard/objects/Cursor";
import type { CursorFactory } from "@repo/core/whiteboard/objects/factories/CursorFactory";
import { FabricCursor } from "@repo/ui/whiteboard/objects/FabricCursor";
import { type Canvas, loadSVGFromURL } from "fabric";

const cursorSVG = await loadSVGFromURL("cursor.svg");

export class FabricCursorFactory implements CursorFactory {
  private readonly canvas: Canvas;

  constructor(canvas: Canvas) {
    this.canvas = canvas;
  }

  create(data: Cursor) {
    return new FabricCursor({
      canvas: this.canvas,
      data,
      svg: cursorSVG,
    });
  }
}
