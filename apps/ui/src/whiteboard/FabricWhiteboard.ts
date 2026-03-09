import { WhiteboardSession } from "@repo/core/whiteboard/collaborative/WhiteboardSession";
import { addPanningModule } from "@repo/ui/whiteboard/canvas/modules/pan";
import { addZoomingModule } from "@repo/ui/whiteboard/canvas/modules/zoom";
import { FabricCursorFactory } from "@repo/ui/whiteboard/objects/factories/FabricCursorFactory";
import { FabricStickyNoteFactory } from "@repo/ui/whiteboard/objects/factories/FabricStickyNoteFactory";
import { Canvas, type TPointerEventInfo } from "fabric";

export class FabricWhiteboard {
  private readonly canvas: Canvas;
  private readonly collaborativeSession: WhiteboardSession;
  private readonly stickyNoteFactory: FabricStickyNoteFactory;

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

    addPanningModule(this.canvas);
    addZoomingModule(this.canvas);

    this.canvas.requestRenderAll();

    this.stickyNoteFactory = new FabricStickyNoteFactory(this.canvas);
    const cursorFactory = new FabricCursorFactory(this.canvas);

    const wsUrl = import.meta.env.MODE === "development"
      ? "ws://localhost:8080/api/collaboration"
      : "wss://ddd-lab.gabrielhamel.fr/api/collaboration";

    this.collaborativeSession = new WhiteboardSession(
      wsUrl,
      this.stickyNoteFactory,
      cursorFactory,
    );

    this.canvas.on("mouse:move", this.handleMouseMove.bind(this));
  }

  async dispose() {
    this.collaborativeSession.dispose();
    await this.canvas.dispose();
  }

  resize(width: number, height: number) {
    this.canvas.setDimensions({
      height,
      width,
    });
  }

  createStickyNote(color: string) {
    const { x, y } = this.canvas.getVpCenter();

    const stickyNote = this.stickyNoteFactory.create({
      data: {
        color,
        text: "",
        x,
        y,
      },
      session: this.collaborativeSession,
    });

    this.collaborativeSession.addStickyNote(stickyNote);
  }

  private handleMouseMove(event: TPointerEventInfo) {
    this.collaborativeSession.updateCursorPosition(event.scenePoint.x, event.scenePoint.y);
  }
}
