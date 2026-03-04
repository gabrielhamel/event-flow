import { CollaborativeWhiteboardSession } from "@repo/core/collaborative/CollaborativeWhiteboardSession";
import type { CursorCollaborativeData } from "@repo/core/CursorCollaborativeData";
import type { StickyNoteCollaborativeData } from "@repo/core/StickyNoteCollaborativeData";
import { addDottedBackgroundModule } from "@repo/event-storming-ui/whiteboard/canvas/modules/dottedBackground";
import { addPanningModule } from "@repo/event-storming-ui/whiteboard/canvas/modules/panning";
import { addZoomingModule } from "@repo/event-storming-ui/whiteboard/canvas/modules/zooming";
import { FabricCursor } from "@repo/event-storming-ui/whiteboard/FabricCursor";
import { FabricStickyNote } from "@repo/event-storming-ui/whiteboard/FabricStickyNote";
import { Canvas, loadSVGFromURL, type TPointerEventInfo } from "fabric";

const cursorSVG = await loadSVGFromURL("cursor.svg");

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

    this.collaborativeSession = new CollaborativeWhiteboardSession(
      import.meta.env.MODE === "development"
        ? "ws://localhost:8080/api/event-storming/collaboration"
        : "wss://ddd-lab.gabrielhamel.fr/api/event-storming/collaboration",
      {
        onCreateCursor: this.handleCreateCursor.bind(this),
        onCreateStickyNote: this.handleCreateStickyNote.bind(this),
      },
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

  private handleCreateStickyNote(id: string, stickyNoteCollaborativeData: StickyNoteCollaborativeData) {
    return new FabricStickyNote({
      canvas: this.canvas,
      data: stickyNoteCollaborativeData,
      id,
      onUpdate: this.collaborativeSession.updateStickyNote.bind(this.collaborativeSession),
    });
  }

  private handleCreateCursor(cursorCollaborativeData: CursorCollaborativeData) {
    return new FabricCursor({
      canvas: this.canvas,
      data: cursorCollaborativeData,
      svg: cursorSVG,
    });
  }

  private handleMouseMove(event: TPointerEventInfo) {
    this.collaborativeSession.updateCursorPosition(event.scenePoint.x, event.scenePoint.y);
  }
}
