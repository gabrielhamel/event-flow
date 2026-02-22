import z from "zod";

export class Pin {
  static schema = z
    .string()
    .length(4)
    .refine((val) => /^\d+$/u.test(val));

  private readonly value: string;

  private constructor(value: string) {
    this.value = value;
  }

  static create(value: string) {
    const parsedValue = this.schema.parse(value);

    return new Pin(parsedValue);
  }

  toString() {
    return this.value;
  }

  equals(other: Pin) {
    return this.value === other.value;
  }
}
