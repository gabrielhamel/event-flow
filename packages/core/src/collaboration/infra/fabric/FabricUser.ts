import type { Cursor } from "@repo/core/collaboration/domain/Cursor.ts";
import type { User } from "@repo/core/collaboration/domain/User.ts";

export class FabricUser implements User {
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
