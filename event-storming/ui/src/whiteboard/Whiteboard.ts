import { CollaborativeSession } from "@repo/event-storming-ui/whiteboard/CollaborativeSession.ts";
import { Canvas, Color, FabricObject, type TPointerEventInfo, type TRGBColorSource } from "fabric";
import { setupDottedBackgroundForCanvas } from "./features/background.ts";
import { setupPanningForCanvas } from "./features/pan.ts";
import { setupZoomingForCanvas } from "./features/zoom.ts";
import { StickyNote } from "./StickyNote.ts";

export class Whiteboard {
  private readonly canvas: Canvas;
  private readonly collaborativeSession: CollaborativeSession;
  private userMap: Record<number, FabricObject> = {};

  constructor(
    anchor: HTMLCanvasElement,
    width: number,
    height: number,
  ) {
    this.canvas = new Canvas(anchor, {
      enableRetinaScaling: true,
      width,
      height,
      selection: false,
    });

    setupPanningForCanvas(this.canvas);
    setupDottedBackgroundForCanvas(this.canvas);
    setupZoomingForCanvas(this.canvas);

    this.canvas.requestRenderAll();

    this.collaborativeSession = new CollaborativeSession({
      onNewUser: this.onNewUser.bind(this),
      onUserCursorMove: this.onUserCursorMove.bind(this),
    });

    this.canvas.on("mouse:move", this.onMouseMove.bind(this));
  }

  private onMouseMove(event: TPointerEventInfo) {
    this.collaborativeSession.updateCurrentUserCursorPosition(event.scenePoint.x, event.scenePoint.y);
  }

  destroy() {
    this.collaborativeSession.destroy();
    void this.canvas.dispose();
  }

  resize(width: number, height: number) {
    this.canvas.setDimensions({
      width,
      height,
    });
  }

  addStickyNote(color: string) {
    const stickyNote = new StickyNote(color);

    stickyNote.attach(this.canvas);
  }

  private onNewUser(userId: number, color: TRGBColorSource) {
    console.log(`New user: ${userId} with color ${color}`);

    const cursor = new FabricObject({
      width: 10,
      height: 20,
      backgroundColor: `#${new Color(color).toHex()}`,
      hasControls: false,
      hasBorders: false,
    });

    this.canvas.add(cursor);

    this.userMap[userId] = cursor;
  }

  private onUserCursorMove(userId: number, x: number, y: number) {
    const cursor = this.userMap[userId];

    if (cursor) {
      cursor.set({
        left: x,
        top: y,
      });
      this.canvas.requestRenderAll();
    }
  }
}
