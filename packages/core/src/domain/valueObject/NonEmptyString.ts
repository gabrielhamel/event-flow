import z from "zod";

export class NonEmptyString {
  static schema = z.string().nonempty();

  private readonly value: string;

  private constructor(value: string) {
    this.value = value;
  }

  static create(value: string) {
    const parsedValue = this.schema.parse(value);

    return new NonEmptyString(parsedValue);
  }

  equals(other: NonEmptyString) {
    return this.value === other.value;
  }

  toString() {
    return this.value;
  }
}
