import { CollaborativeWhiteboardSession } from "@repo/core/collaborative/CollaborativeWhiteboardSession";
import { addDottedBackgroundModule } from "@repo/event-storming-ui/whiteboard/canvas/modules/dottedBackground";
import { addPanningModule } from "@repo/event-storming-ui/whiteboard/canvas/modules/panning";
import { addZoomingModule } from "@repo/event-storming-ui/whiteboard/canvas/modules/zooming";
import { FabricCursorFactory } from "@repo/event-storming-ui/whiteboard/FabricCursorFactory";
import { FabricStickyNote } from "@repo/event-storming-ui/whiteboard/FabricStickyNote";
import { FabricStickyNoteFactory } from "@repo/event-storming-ui/whiteboard/FabricStickyNoteFactory";
import { Canvas, type TPointerEventInfo } from "fabric";

export class FabricWhiteboard {
  private readonly canvas: Canvas;
  private readonly collaborativeSession: CollaborativeWhiteboardSession;

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
    addDottedBackgroundModule(this.canvas);
    addZoomingModule(this.canvas);

    this.canvas.requestRenderAll();

    const stickyNoteFactory = new FabricStickyNoteFactory(this.canvas);
    const cursorFactory = new FabricCursorFactory(this.canvas);

    const wsUrl = import.meta.env.MODE === "development"
      ? "ws://localhost:8080/api/event-storming/collaboration"
      : "wss://ddd-lab.gabrielhamel.fr/api/event-storming/collaboration";

    this.collaborativeSession = new CollaborativeWhiteboardSession(
      wsUrl,
      stickyNoteFactory,
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
    const viewportCenter = this.canvas.getVpCenter();
    const left = viewportCenter.x;
    const top = viewportCenter.y;

    const stickyNote = new FabricStickyNote({
      canvas: this.canvas,
      data: {
        color,
        text: "",
        x: left,
        y: top,
      },
      onUpdate: this.collaborativeSession.updateStickyNote.bind(this.collaborativeSession),
    });

    this.collaborativeSession.addStickyNote(stickyNote);
  }

  private handleMouseMove(event: TPointerEventInfo) {
    this.collaborativeSession.updateCursorPosition(event.scenePoint.x, event.scenePoint.y);
  }
}
