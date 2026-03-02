import type { Whiteboard } from "@repo/core/Whiteboard";
import { CollaborativeSession } from "@repo/event-storming-ui/collaboration/CollaborativeSession";
import { addDottedBackgroundModule } from "@repo/event-storming-ui/whiteboard/canvas/modules/dottedBackground";
import { addPanningModule } from "@repo/event-storming-ui/whiteboard/canvas/modules/panning";
import { addZoomingModule } from "@repo/event-storming-ui/whiteboard/canvas/modules/zooming";
import { Canvas, type TPointerEventInfo } from "fabric";
import { _FabricStickyNote } from "./_FabricStickyNote";

export class FabricWhiteboard implements Whiteboard {
  private readonly canvas: Canvas;
  private readonly collaborativeSession: CollaborativeSession;
  private readonly stickyNotes = new Map<string, _FabricStickyNote>();

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
    const viewportCenter = this.canvas.getVpCenter();
    const left = viewportCenter.x;
    const top = viewportCenter.y;

    const stickyNote = new _FabricStickyNote(color, left, top);
    this.stickyNotes.set(stickyNote.id(), stickyNote);

    stickyNote.attach(this.canvas);

    this.collaborativeSession.addStickyNote(stickyNote);
  }

  private addStickyNoteFromNetwork(stickyNoteDocumentObject: StickyNoteDocumentObject) {
    if (this.stickyNotes.has(stickyNoteDocumentObject.id)) {
      return;
    }

    const stickyNote = _FabricStickyNote.makeFromDocumentObject(stickyNoteDocumentObject);
    stickyNote.attach(this.canvas);
    stickyNote.enterEditing();

    this.stickyNotes.set(stickyNote.id(), stickyNote);
  }

  private onMouseMove(event: TPointerEventInfo) {
    this.collaborativeSession.updateCurrentUserCursorPosition(event.scenePoint.x, event.scenePoint.y);
  }
}
