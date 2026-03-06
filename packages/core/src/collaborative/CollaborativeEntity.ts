import type { Id } from "@repo/core/Id";

export abstract class CollaborativeEntity<Data> {
  protected data: Data;
  private readonly entityId: Id;
  private readonly propagateUpdateCallback: ((id: Id, data: Data) => void) | undefined;

  protected constructor(props: { id: Id; data: Data; onUpdate?: (id: Id, data: Data) => void }) {
    this.entityId = props.id;
    this.data = props.data;
    this.propagateUpdateCallback = props.onUpdate;
  }

  id() {
    return this.entityId;
  }

  collaborativeData() {
    return this.data;
  }

  protected propagateCollaborativeUpdate() {
    this.propagateUpdateCallback?.(this.entityId, this.data);
  }

  abstract updateFromCollaborativeData(data: Data): void;
}
