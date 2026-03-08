import { CollaborativeEntity } from "@repo/core/collaborative/CollaborativeEntity";
import { generateId } from "@repo/core/Id";
import type { Cursor } from "@repo/core/whiteboard/objects/Cursor.ts";
import { listenCanvasZoom } from "@repo/event-storming-ui/whiteboard/canvas/modules/zoom";
import { type Canvas, type FabricObject, type loadSVGFromURL, util } from "fabric";

export class FabricCursor extends CollaborativeEntity<Cursor> {
  private readonly object: FabricObject;
  private readonly canvas: Canvas;
  private readonly objectAddedUnsubscribe: () => void;
  private readonly zoomUnsubscribe: () => void;

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
    this.object = util.groupSVGElements(objects, {
      ...props.svg.options,
    });

    this.object.set({
      evented: false,
      fill: props.data.color,
      left: props.data.x + (this.object.width / 2) * (1 / this.canvas.getZoom()),
      selectable: false,
      stroke: "#000000",
      strokeWidth: 1,
      top: props.data.y + (this.object.height / 2) * (1 / this.canvas.getZoom()),
    });

    this.canvas.add(this.object);
    this.canvas.bringObjectToFront(this.object);

    this.objectAddedUnsubscribe = this.canvas.on("object:added", () => {
      this.canvas.bringObjectToFront(this.object);
    });
    this.zoomUnsubscribe = listenCanvasZoom(this.canvas, this.scaleOnZoom.bind(this));
  }

  dispose() {
    this.zoomUnsubscribe();
    this.objectAddedUnsubscribe();

    this.canvas.remove(this.object);
    this.object.dispose();
  }

  scaleOnZoom() {
    this.object.scale(1 / this.canvas.getZoom());
  }

  updateFromCollaborativeData(data: Cursor) {
    this.object.set("fill", data.color);
    this.object.set({
      left: data.x + (this.object.width / 2) * (1 / this.canvas.getZoom()),
      top: data.y + (this.object.height / 2) * (1 / this.canvas.getZoom()),
    });
    this.canvas.requestRenderAll();
  }
}
