import type { Id } from "@repo/core/Id";
import type { WhiteboardSession } from "@repo/core/whiteboard/collaborative/WhiteboardSession";
import type { StickyNoteFactory } from "@repo/core/whiteboard/objects/factories/StickyNoteFactory";
import type { StickyNote } from "@repo/core/whiteboard/objects/StickyNote";
import { FabricStickyNote } from "@repo/event-storming-ui/whiteboard/objects/FabricStickyNote";
import type { Canvas } from "fabric";

export class FabricStickyNoteFactory implements StickyNoteFactory {
  private readonly canvas: Canvas;

  constructor(canvas: Canvas) {
    this.canvas = canvas;
  }

  create(
    { id, data, session }: { id?: Id; data: StickyNote; session: WhiteboardSession },
  ) {
    return new FabricStickyNote({
      canvas: this.canvas,
      data,
      id,
      onUpdate: session.updateStickyNote.bind(session),
    });
  }
}
