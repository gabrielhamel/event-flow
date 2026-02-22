import type { BinaryOutput } from "@repo/core/domain/repository/BinaryOutput";

export class InMemoryBinaryOutput implements BinaryOutput {
  private internalState: 0 | 1 = 0;

  get state() {
    return this.internalState;
  }

  write(value: 0 | 1) {
    this.internalState = value;

    return Promise.resolve();
  }
}
