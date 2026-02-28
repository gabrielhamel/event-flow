import type { Cursor } from "@repo/core/collaboration/domain/Cursor.ts";
import { type Canvas, FabricObject } from "fabric";

export class FabricCursor implements Cursor {
  private readonly object: FabricObject;

  private constructor(object: FabricObject) {
    this.object = object;
  }

  static make(canvas: Canvas, hexColor: string) {
    const object = new FabricObject({
      backgroundColor: hexColor,
      hasBorders: false,
      hasControls: false,
      height: 20,
      width: 10,
    });

    canvas.add(object);

    return new FabricCursor(object);
  }

  setPosition(x: number, y: number) {
    this.object.set({ left: x, top: y });
    this.object.canvas?.requestRenderAll();
  }
}
