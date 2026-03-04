export abstract class CollaborativeEntity<Data> {
  protected data: Data;
  private readonly entityId: string;
  private readonly propagateUpdateCallback: (id: string, data: Data) => void;

  protected constructor(props: { id: string; data: Data; onUpdate: (id: string, data: Data) => void }) {
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
    this.propagateUpdateCallback(this.entityId, this.data);
  }

  abstract updateFromCollaborativeData(data: Data): void;
}
