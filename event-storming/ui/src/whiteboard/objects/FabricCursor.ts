import { CollaborativeEntity } from "@repo/core/collaborative/CollaborativeEntity";
import { generateId } from "@repo/core/Id";
import type { Cursor } from "@repo/core/whiteboard/objects/Cursor.ts";
import { listenCanvasZoom } from "@repo/event-storming-ui/whiteboard/canvas/modules/zoom";
import { type Canvas, type FabricObject, type loadSVGFromURL, util } from "fabric";

export class FabricCursor extends CollaborativeEntity<Cursor> {
  private readonly object: FabricObject;
  private readonly canvas: Canvas;

  constructor(
    props: {
      canvas: Canvas;
      svg: Awaited<ReturnType<typeof loadSVGFromURL>>;
      data: Cursor;
    },
  ) {
    super({
      data: props.data,
      id: generateId("cursor"),
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
      left: props.data.x,
      selectable: false,
      stroke: "#000000",
      strokeWidth: 1,
      top: props.data.y,
    });

    this.canvas.add(this.object);
    this.canvas.bringObjectToFront(this.object);
    this.canvas.on("object:added", () => {
      this.canvas.bringObjectToFront(this.object);
    });

    listenCanvasZoom(this.canvas, this.scaleOnZoom.bind(this));
  }

  scaleOnZoom() {
    this.object.scale(1 / this.canvas.getZoom());
  }

  updateFromCollaborativeData(data: Cursor) {
    this.object.set("fill", data.color);
    this.object.set({
      left: data.x,
      top: data.y,
    });
    this.canvas.requestRenderAll();
  }
}
