import * as crypto from "node:crypto";

export abstract class CollaborativeEntity<Data> {
  protected data: Data;
  private readonly entityId: string;

  protected constructor(data: Data) {
    this.entityId = crypto.randomUUID();
    this.data = data;
  }

  id() {
    return this.entityId;
  }

  collaborativeData() {
    return this.data;
  }

  abstract onUpdate(data: Partial<Data>): void;
}
