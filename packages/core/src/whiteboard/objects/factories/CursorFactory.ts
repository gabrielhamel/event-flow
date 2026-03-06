import type { CollaborativeEntity } from "@repo/core/collaborative/CollaborativeEntity";
import type { Cursor } from "@repo/core/whiteboard/objects/Cursor";

export interface CursorFactory {
  create: (data: Cursor) => CollaborativeEntity<Cursor>;
}
