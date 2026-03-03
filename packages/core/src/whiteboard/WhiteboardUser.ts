import type { Cursor } from "@repo/core/Cursor.ts";

export interface WhiteboardUser {
  getId: () => number;
  getCursor: () => Cursor;
}
