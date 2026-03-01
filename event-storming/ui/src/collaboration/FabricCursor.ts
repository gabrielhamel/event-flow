import type { Cursor } from "@repo/core/Cursor.ts";
import { type Canvas, type FabricObject, loadSVGFromURL, util } from "fabric";

const loadSVGObject = async (url: string) => {
  const svg = await loadSVGFromURL(url);
  const objects = svg.objects.filter((obj): obj is FabricObject => obj !== null);

  return util.groupSVGElements(objects, svg.options);
};

export class FabricCursor implements Cursor {
  private readonly object: FabricObject;

  private constructor(object: FabricObject) {
    this.object = object;
  }

  static async make(canvas: Canvas, hexColor: string) {
    const object = await loadSVGObject("cursor.svg");
    object.set({ evented: false, fill: hexColor, selectable: false });
    canvas.add(object);

    return new FabricCursor(object);
  }

  setPosition(x: number, y: number) {
    this.object.set({ left: x, top: y });
    this.object.canvas?.requestRenderAll();
  }
}
