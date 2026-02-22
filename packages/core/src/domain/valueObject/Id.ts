import * as uuid from "uuid";
import z from "zod";

export class Id {
  static schema = z.string().refine((val: string) => {
    const parts = val.split("_");

    return (
      parts.length === 2 &&
      z.string().min(1).safeParse(parts[0]).success &&
      z.uuidv7().safeParse(parts[1]).success
    );
  });

  private readonly value: string;

  private constructor(value: string) {
    this.value = value;
  }

  static fromString(value: string) {
    const parsedValue = this.schema.parse(value);

    return new Id(parsedValue);
  }

  static create(entityName: string, hash = uuid.v7()) {
    const id = `${entityName}_${hash}`;
    const parsedValue = this.schema.parse(id);

    return new Id(parsedValue);
  }

  equals(other: Id) {
    return this.value === other.value;
  }

  toString() {
    return this.value;
  }
}
