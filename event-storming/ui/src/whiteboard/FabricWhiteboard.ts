import { CollaborativeWhiteboardSession } from "@repo/core/collaborative/CollaborativeWhiteboardSession";
import type { StickyNoteCollaborativeData } from "@repo/core/StickyNoteCollaborativeData";
import type { Whiteboard } from "@repo/core/whiteboard/Whiteboard";
import { addDottedBackgroundModule } from "@repo/event-storming-ui/whiteboard/canvas/modules/dottedBackground";
import { addPanningModule } from "@repo/event-storming-ui/whiteboard/canvas/modules/panning";
import { addZoomingModule } from "@repo/event-storming-ui/whiteboard/canvas/modules/zooming";
import { FabricStickyNote } from "@repo/event-storming-ui/whiteboard/FabricStickyNote";
import { Canvas } from "fabric";

export class FabricWhiteboard implements Whiteboard {
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
        createStickyNote: this.handleCreateStickyNote.bind(this),
      },
    );
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
      data: {
        color,
        text: "",
        x: left,
        y: top,
      },
      onUpdate: this.collaborativeSession.updateStickyNote.bind(this.collaborativeSession),
    });
    stickyNote.attachToCanvas(this.canvas);

    this.collaborativeSession.addStickyNote(stickyNote);
  }

  private handleCreateStickyNote(id: string, stickyNoteCollaborativeData: StickyNoteCollaborativeData) {
    const stickyNote = new FabricStickyNote({
      data: stickyNoteCollaborativeData,
      id,
      onUpdate: this.collaborativeSession.updateStickyNote.bind(this.collaborativeSession),
    });
    stickyNote.attachToCanvas(this.canvas);

    return stickyNote;
  }
}
