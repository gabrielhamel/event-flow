import type {
  CollaborativeWhiteboardSession,
  StickyNoteFactory,
} from "@repo/core/collaborative/CollaborativeWhiteboardSession";
import type { StickyNoteCollaborativeData } from "@repo/core/collaborative/StickyNoteCollaborativeData";
import { FabricStickyNote } from "@repo/event-storming-ui/whiteboard/FabricStickyNote";
import type { Canvas } from "fabric";

export class FabricStickyNoteFactory implements StickyNoteFactory {
  private readonly canvas: Canvas;

  constructor(canvas: Canvas) {
    this.canvas = canvas;
  }

  create(id: string, data: StickyNoteCollaborativeData, session: CollaborativeWhiteboardSession) {
    return new FabricStickyNote({
      canvas: this.canvas,
      data,
      id,
      onUpdate: session.updateStickyNote.bind(session),
    });
  }
}
