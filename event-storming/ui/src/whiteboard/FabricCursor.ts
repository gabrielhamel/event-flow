import { CollaborativeEntity } from "@repo/core/collaborative/CollaborativeEntity";
import type { CursorCollaborativeData } from "@repo/core/collaborative/CursorCollaborativeData.ts";
import { type Canvas, type FabricObject, type loadSVGFromURL, type TPointerEventInfo, util } from "fabric";

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

    const handleMouseWheel = ({ e: event }: TPointerEventInfo<WheelEvent>) => {
      event.preventDefault();
      event.stopPropagation();

      if (event.ctrlKey) {
        this.object.scale(1 / this.canvas.getZoom());
      }
    };
    this.canvas.on("mouse:wheel", handleMouseWheel);
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
