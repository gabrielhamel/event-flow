import type { Id } from "@repo/core/Id";

export abstract class CollaborativeEntity<Data> {
  protected data: Data;
  private readonly entityId: Id;
  private readonly propagateUpdateCallback: ((id: Id, data: Data) => void) | undefined;
  private readonly propagateDeleteCallback: ((id: Id) => void) | undefined;

  protected constructor(
    props: { id: Id; data: Data; onUpdate?: (id: Id, data: Data) => void; onDelete?: (id: Id) => void },
  ) {
    this.entityId = props.id;
    this.data = props.data;
    this.propagateUpdateCallback = props.onUpdate;
    this.propagateDeleteCallback = props.onDelete;
  }

  id() {
    return this.entityId;
  }

  collaborativeData() {
    return this.data;
  }

  protected propagateUpdate() {
    this.propagateUpdateCallback?.(this.entityId, this.data);
  }

  protected propagateDelete() {
    this.propagateDeleteCallback?.(this.entityId);
  }

  abstract updateFromCollaborativeData(data: Data): void;

  abstract dispose(): void;
}
