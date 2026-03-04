import { CollaborativeEntity } from "@repo/core/collaborative/CollaborativeEntity";
import type { CursorCollaborativeData } from "@repo/core/CursorCollaborativeData.ts";
import { type Canvas, type FabricObject, type loadSVGFromURL, util } from "fabric";

export class FabricCursor extends CollaborativeEntity<CursorCollaborativeData> {
  private readonly object: FabricObject;
  private readonly canvas: Canvas;

  constructor(
    props: {
      canvas: Canvas;
      svg: Awaited<ReturnType<typeof loadSVGFromURL>>;
      data: CursorCollaborativeData;
    },
  ) {
    super({
      data: props.data,
      id: crypto.randomUUID(),
      onUpdate: () => {
        /* Empty */
      },
    });

    const objects = props.svg.objects.filter((obj): obj is FabricObject => obj !== null);

    this.canvas = props.canvas;
    this.object = util.groupSVGElements(objects, props.svg.options);

    this.object.set({
      evented: false,
      fill: props.data.color,
      selectable: false,
      stroke: "#000000",
      strokeWidth: 20,
    });

    this.canvas.add(this.object);
    this.canvas.bringObjectToFront(this.object);
    this.canvas.on("object:added", () => {
      this.canvas.bringObjectToFront(this.object);
    });
  }

  updateFromCollaborativeData(data: CursorCollaborativeData) {
    this.object.set("fill", data.color);
    this.object.set({
      left: data.x,
      top: data.y,
    });
    this.canvas.requestRenderAll();
  }
}
