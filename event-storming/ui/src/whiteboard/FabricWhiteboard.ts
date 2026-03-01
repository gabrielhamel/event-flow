import type { StickyNoteDocumentObject } from "@repo/core/StickyNote";
import type { Whiteboard } from "@repo/core/Whiteboard";
import { CollaborativeSession } from "@repo/event-storming-ui/collaboration/CollaborativeSession";
import { addDottedBackgroundModule } from "@repo/event-storming-ui/whiteboard/canvas/modules/dottedBackground";
import { addPanningModule } from "@repo/event-storming-ui/whiteboard/canvas/modules/panning";
import { addZoomingModule } from "@repo/event-storming-ui/whiteboard/canvas/modules/zooming";
import { Canvas, type TPointerEventInfo } from "fabric";
import { FabricStickyNote } from "./FabricStickyNote";

export class FabricWhiteboard implements Whiteboard {
  private readonly canvas: Canvas;
  private readonly collaborativeSession: CollaborativeSession;
  private readonly stickyNotes = new Map<string, FabricStickyNote>();

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

    this.collaborativeSession = new CollaborativeSession(this.canvas, this.addStickyNoteFromNetwork.bind(this));

    this.canvas.on("mouse:move", this.onMouseMove.bind(this));
  }

  async dispose() {
    this.collaborativeSession.destroy();
    await this.canvas.dispose();
  }

  resize(width: number, height: number) {
    this.canvas.setDimensions({
      height,
      width,
    });
  }

  createStickyNote(color: string) {
    const stickyNote = new FabricStickyNote(color);
    this.stickyNotes.set(stickyNote.id(), stickyNote);

    stickyNote.attach(this.canvas, true, true);

    this.collaborativeSession.addStickyNote(stickyNote);
  }

  private addStickyNoteFromNetwork(stickyNoteDocumentObject: StickyNoteDocumentObject) {
    if (this.stickyNotes.has(stickyNoteDocumentObject.id)) {
      return;
    }

    const stickyNote = FabricStickyNote.makeFromDocumentObject(stickyNoteDocumentObject);
    stickyNote.attach(this.canvas, false, false);

    this.stickyNotes.set(stickyNote.id(), stickyNote);
  }

  private onMouseMove(event: TPointerEventInfo) {
    this.collaborativeSession.updateCurrentUserCursorPosition(event.scenePoint.x, event.scenePoint.y);
  }
}
