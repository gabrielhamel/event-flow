import type { Cursor } from "@repo/core/collaboration/domain/Cursor.ts";

export interface User {
  getId: () => number;
  getCursor: () => Cursor;
}
