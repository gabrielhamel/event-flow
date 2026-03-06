import type { CollaborativeEntity } from "@repo/core/collaborative/CollaborativeEntity";
import type { WhiteboardSession } from "@repo/core/whiteboard/collaborative/WhiteboardSession";
import type { StickyNote } from "@repo/core/whiteboard/objects/StickyNote";

export interface StickyNoteFactory {
  create: (
    params: { id: string; data: StickyNote; session: WhiteboardSession },
  ) => CollaborativeEntity<StickyNote>;
}
