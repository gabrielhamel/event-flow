import { v7 as uuid } from "uuid";

export abstract class CollaborativeEntity<Data> {
  protected data: Data;
  private readonly entityId: string;
  private readonly propagateUpdateCallback: (id: string, data: Data) => void;

  protected constructor(data: Data, onUpdate: (id: string, data: Data) => void) {
    this.entityId = uuid();
    this.data = data;
    this.propagateUpdateCallback = onUpdate;
  }

  id() {
    return this.entityId;
  }

  collaborativeData() {
    return this.data;
  }

  protected propagateCollaborativeUpdate() {
    this.propagateUpdateCallback(this.entityId, this.data);
  }

  abstract updateFromCollaborativeData(data: Data): void;
}
