export interface BinaryOutput {
  write: (value: 0 | 1) => Promise<void>;
}
