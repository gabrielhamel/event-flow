import type { Cursor } from "@repo/core/Cursor.ts";
import type { WhiteboardUser } from "@repo/core/whiteboard/WhiteboardUser.ts";

export class FabricUser implements WhiteboardUser {
  private readonly id: number;
  private readonly cursor: Cursor;

  constructor(id: number, cursor: Cursor) {
    this.id = id;
    this.cursor = cursor;
  }

  getId() {
    return this.id;
  }

  getCursor() {
    return this.cursor;
  }
}
