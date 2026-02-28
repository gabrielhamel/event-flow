import { CollaborativeSession } from "@repo/event-storming-ui/whiteboard/CollaborativeSession";
import { Canvas, type TPointerEventInfo } from "fabric";
import { setupDottedBackgroundForCanvas } from "./features/background";
import { setupPanningForCanvas } from "./features/pan";
import { setupZoomingForCanvas } from "./features/zoom";
import { StickyNote } from "./StickyNote";

export class Whiteboard {
  private readonly canvas: Canvas;
  private readonly collaborativeSession: CollaborativeSession;

  constructor(
    anchor: HTMLCanvasElement,
    width: number,
    height: number,
  ) {
    this.canvas = new Canvas(anchor, {
      enableRetinaScaling: true,
      height,
      selection: false,
      width,
    });

    setupPanningForCanvas(this.canvas);
    setupDottedBackgroundForCanvas(this.canvas);
    setupZoomingForCanvas(this.canvas);

    this.canvas.requestRenderAll();

    this.collaborativeSession = new CollaborativeSession(this.canvas);

    this.canvas.on("mouse:move", this.onMouseMove.bind(this));
  }

  destroy() {
    this.collaborativeSession.destroy();
    void this.canvas.dispose();
  }

  resize(width: number, height: number) {
    this.canvas.setDimensions({
      height,
      width,
    });
  }

  addStickyNote(color: string) {
    const stickyNote = new StickyNote(color);

    stickyNote.attach(this.canvas);
  }

  private onMouseMove(event: TPointerEventInfo) {
    this.collaborativeSession.updateCurrentUserCursorPosition(event.scenePoint.x, event.scenePoint.y);
  }
}
